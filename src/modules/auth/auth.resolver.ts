import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
// import { nanoid } from 'nanoid/async'
import { prisma, redis } from '../../index'
import { signAuthToken, verifyAuthToken } from '../../utils/jwt.util'
import { verifyCode } from '../../utils/2fa.util'
import { previewUrl, sendEmailConfirmationMail } from '../../utils/mail.util'
import { CustomContext } from '../../types/custom-context'
import { ConfirmInput, LoginInput, LoginReturnType, LoginType, RegisterInput, TwoFAInput } from './auth.schema'
import { compare, hash } from '../../utils/password.util'
import { randomUUID } from 'crypto'

@Resolver()
export class AuthResolver {
    @Query(() => [String])
    async recipe(@Arg("email") email: string) {
        const users = await prisma.user.findMany({
            where: {
                email: email
            }
        })

        return users.map((val) => val.username);
    }

    @Mutation(() => Boolean)
    async register(@Arg('data') data: RegisterInput) {
        const user = await prisma.user.findFirst({where: {
            username: data.username
        }})

        if (user)
            throw new Error('Username already in use')

        // const code = await nanoid(30)
        const code = randomUUID()
        await redis.set(`confirmation:register:${code}`, JSON.stringify(data), {
            EX: 300
        }).catch(console.error)

        // Sending email
        const info = await sendEmailConfirmationMail(data.email, `https://animakuro.domain/confirm/${code}`)
        console.log(previewUrl(info))
        return true
    }

    @Mutation(() => Boolean)
    async confirmRegistration(@Arg('data') data: ConfirmInput) {
        const info = await redis.get(`confirmation:register:${data.token}`)
        if (!info)
            throw new Error('Invalid token')

        await redis.del(`confirmation:register:${data.token}`)
        const {email, password, username}: RegisterInput = JSON.parse(info)

        const user = await prisma.user.findFirst({where: {
            OR: [ {email}, {username} ]
        }})

        if (user) {
            if (user.username === username)
                throw new Error('Username already in use')

            // TODO: Temporary, remove in next version
            if (user.email === email)
                throw new Error('Email already in use')

            return false
        }

        const pw= await hash(password)
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
    async login(@Arg('data') data: LoginInput, @Ctx() ctx: CustomContext): Promise<LoginReturnType> {

        const user = await prisma.user.findFirst({
            where: { username: data.username }
        })

        if (!user || !await compare(data.password, user.password))
            throw new Error("Invalid credentials")

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
                ip: (ctx.request.headers['x-forwarded-for'] || "") as string, // TODO: recheck
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
    async confirm2fa(@Arg('data') data: TwoFAInput, @Ctx() ctx: CustomContext) {
        const userId = await redis.get(`confirmation:2fa-auth:${data.token}`)

        // TODO: get user from DB and check his 2FA code (if 2fa still linked)!!!
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user)
            throw new Error("Internal")

        if (user.secret2fa && !verifyCode(user.secret2fa, data.code))
                throw new Error("Invalid 2fa code")

        const session = await prisma.siteAuthSession.create({
            data: {
                agent: ctx.request.headers['user-agent'],
                ip: ctx.request.headers['x-forwarded-for'] as string, // TODO: recheck
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
        const session = await prisma.siteAuthSession.delete({
            where: {
                id: decoded.sub,
            }
        })

        if (!session)
            throw new Error("Invalid session")

        return true
    }
}