import { hash, compare } from 'bcryptjs'
import { z } from 'zod'
import prisma from './prisma'

const userSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
})

export type UserInput = z.infer<typeof userSchema>

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>

export async function createUser(userData: UserInput) {
    const { username, email, password } = userSchema.parse(userData)

    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username }, { email }] },
    })
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    })

    return { id: user.id, username: user.username, email: user.email }
}

export async function validateUser(loginData: LoginInput) {
    const { email, password } = loginSchema.parse(loginData)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return null
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
        return null
    }

    return { id: user.id, username: user.username, email: user.email }
}
