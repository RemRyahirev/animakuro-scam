import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prisma, redis } from '../../index'
import { previewUrl, sendEmailChangeConfirmationMail } from '@utils/mail.util'
import { compare, hash } from '@utils/password.util'
import { randomUUID } from 'crypto'
import { errors } from '../../errors/errors'
import { Gender, User, UserInput } from './user.schema'

@Resolver(() => User)
export class UserResolver {
    @Query(() => [User])
    users(@Arg('email') email: string) {
        return prisma.user.findMany({ where: { email }})
    }

    @Query(() => User, { nullable: true })
    user(@Arg('id') id: string) {
        return prisma.user.findUnique({ where: { id }})
    }

    @Mutation(() => User)
    async modifyUser(
        @Arg('id') id: string,
        @Arg('data') data: UserInput
    ) {
        const user = await prisma.user.findUnique({ where: { id }})
        if (!user)
            throw errors.NOT_FOUND('user')

        const validationErrors: { property: string, reasons: string[] }[] = []

        async function checkAndSetNewPassword() {
            if (!data.password)
                return

            // TODO: write logic when password is unsetted
            if (!user.password)
                throw errors.INTERNAL()

            const errorsList: string[] = []

            if (!data.newPassword)
                errorsList.push('Field must be specified in pair with \'newPassword\'')

            if (data.password === data.newPassword)
                errorsList.push('Fields \'password\' and \'newPassword\' must differ')

            if (!await compare(data.password, user.password))
                errorsList.push('Password does not match saved')

            if (errorsList.length == 0) {
                user.password = await hash(data.newPassword)
            }

            if (errorsList.length > 0) {
                validationErrors.push({
                    property: 'password',
                    reasons: errorsList
                })
            }
        }

        async function checkAndSetUsername() {
            if (!data.username)
                return

            if (data.username == user.username)
                return validationErrors.push({
                    property: 'username',
                    reasons: ['Username must differ from current']
                })

            if (await prisma.user.findFirst({where: {username: data.username}}))
                return validationErrors.push({
                    property: 'username',
                    reasons: ['Username already used']
                })

            user.username = data.username
        }

        async function checkAndSetEmail() {
            if (!data.email)
                return

            if (data.email == user.email)
                return validationErrors.push({
                    property: 'email',
                    reasons: ['Email must differ from current']
                })

            // TODO: Temporary, remove in next version
            if (await prisma.user.findFirst({where: {email: data.email}}))
                return validationErrors.push({
                    property: 'email',
                    reasons: ['Email already used']
                })

            const code = randomUUID()
            await redis.set(`confirmation:change-email:${code}`, JSON.stringify({ id: user.id, email: data.email }), {
                EX: 300
            })

            const info = await sendEmailChangeConfirmationMail(user.email, `https://animakuro.domain/change-email/${code}`, data.email)
            console.log(previewUrl(info)) // TODO: REMOVE!
        }

        function checkAndSetBirthday() {
            if (!data.birthday)
                return

            if (data.birthday.getTime() > Date.now())
                return validationErrors.push({
                    property: 'birthday',
                    reasons: ['Weird date']
                })

            user.birthday = data.birthday
        }

        function checkAndSetGender() {
            if (!data.gender)
                return

            switch (data.gender) {
                case Gender.CUSTOM:
                    if (!data.customGender)
                        return validationErrors.push({
                            property: 'gender',
                            reasons: ['For \'CUSTOM\' u must also specify \'customGender\' field']
                        })

                    user.customGender = data.customGender
                    break
                default:
                    user.customGender = null
                    break
            }

            user.gender = data.gender
        }

        await Promise.all([
            checkAndSetNewPassword(),
            checkAndSetUsername(),
            checkAndSetEmail()
        ])

        checkAndSetBirthday()
        checkAndSetGender()

        // TODO: write data.avatar & data.banner handlers

        if (validationErrors.length > 0)
            throw errors.VALIDATION(validationErrors)

        return await prisma.user.update({
            where: { id: user.id },
            data: { ...user }
        })
    }
}
