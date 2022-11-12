import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { prisma, redis } from '../../index'
import { signAuthToken, verifyAuthToken } from '@utils/jwt.util'
import { verifyCode } from '@utils/2fa.util'
import { previewUrl, sendEmailRegistrationConfirmationMail } from '@utils/mail.util'
import { ICustomContext } from '../../types/custom-context.interface'
import { ConfirmInput, LoginInput, LoginReturnType, LoginType, RegisterInput, TwoFAInput } from './auth.schema'
import { compare, hash } from '@utils/password.util'
import { randomUUID } from 'crypto'
import { errors } from '../../errors/errors'

@Resolver()
export class AuthResolver {
    @Mutation(() => Boolean)
    async register(@Arg('data') data: RegisterInput) {
        const user = await prisma.user.findFirst({
            where: {
                username: data.username
            }
        })

        if (user)
            throw errors.AUTH_ERROR('USERNAME_TAKEN')

        // const code = await nanoid(30)
        const code = randomUUID()
        await redis.set(`confirmation:register:${code}`, JSON.stringify(data), {
            EX: 300
        }).catch(console.error)

        // Sending email
        const info = await sendEmailRegistrationConfirmationMail(data.email, `https://animakuro.domain/confirm/${code}`)
        console.log(previewUrl(info))
        return true
    }

    @Mutation(() => Boolean)
    async confirmRegistration(@Arg('data') data: ConfirmInput) {
        const info = await redis.get(`confirmation:register:${data.token}`)
        if (!info)
            throw errors.AUTH_ERROR('CONFIRMATION_TOKEN_INVALID')

        await redis.del(`confirmation:register:${data.token}`)
        const { email, password, username }: RegisterInput = JSON.parse(info)

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        })

        if (user) {
            if (user.username === username)
                throw errors.AUTH_ERROR('USERNAME_TAKEN')

            // TODO: Temporary, remove in next version
            if (user.email === email)
                throw errors.AUTH_ERROR('EMAIL_TAKEN')

            return false
        }

        const pw = await hash(password)
        await prisma.user.create({
            data: {
                email,
                password: pw,
                username
            }
        })

        return true
    }

    @Mutation(() => LoginReturnType)
    async login(@Arg('data') data: LoginInput, @Ctx() ctx: ICustomContext): Promise<LoginReturnType> {

        const user = await prisma.user.findFirst({
            where: { username: data.username }
        })

        if (!user || !await compare(data.password, user.password))
            throw errors.AUTH_ERROR('CREDENTIALS_INVALID')

        if (user.secret2fa) {
            // const token = await nanoid(30)
            const token = randomUUID()
            await redis.set(`confirmation:2fa-auth:${token}`, user.id, { EX: 600 })

            return {
                type: LoginType.TWO_FA,
                token: token
            }
        }

        const session = await prisma.siteAuthSession.create({
            data: {
                agent: ctx.request.headers['user-agent'],
                ip: ctx.request.ip as string, // TODO: recheck
                active: true,
                userId: user.id
            }
        })

        return {
            type: LoginType.AUTH,
            token: await signAuthToken(session.id)
        }
    }

    @Mutation(() => LoginReturnType)
    async confirm2fa(@Arg('data') data: TwoFAInput, @Ctx() ctx: ICustomContext) {
        const userId = await redis.get(`confirmation:2fa-auth:${data.token}`)
        if (!userId)
            throw errors.AUTH_ERROR('TFA_TOKEN_INVALID')

        // TODO: get user from DB and check his 2FA code (if 2fa still linked)!!!
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user)
            throw errors.INTERNAL()

        if (user.secret2fa && !verifyCode(user.secret2fa, data.code))
            throw errors.AUTH_ERROR('TFA_TOKEN_INVALID')

        const session = await prisma.siteAuthSession.create({
            data: {
                agent: ctx.request.headers['user-agent'],
                ip: ctx.request.ip as string, // TODO: recheck
                active: true,
                userId: user.id
            }
        })

        return {
            type: LoginType.AUTH,
            token: await signAuthToken(session.id)
        }
    }

    @Mutation(() => Boolean)
    async logout(@Arg('token', () => String) token: string) {
        const decoded = await verifyAuthToken(token)
        const session = await prisma.siteAuthSession.update({
            where: {
                id: decoded.sub,
            },
            data: {
                active: false
            }
        })

        if (!session)
            throw errors.AUTH_ERROR('SESSION_INVALID')

        return true
    }
}
