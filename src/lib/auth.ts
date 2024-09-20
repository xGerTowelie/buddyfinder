import { hash, compare } from 'bcryptjs'
import { z } from 'zod'
import prisma from './prisma'

// Register Schema
const createUserSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
})
export type CreateUserInput = z.infer<typeof createUserSchema>

// Login Schema
const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string(),
})
export type LoginInput = z.infer<typeof loginSchema>

export async function createUser(userInput: CreateUserInput) {
    // Validate with zod
    const { username, email, password } = createUserSchema.parse(userInput)

    // Is Username / Email in use?
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        },
    })
    if (existingUser) {
        throw new Error('Username or Email already in use')
    }

    // Create user with hash
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
    const { username, password } = loginSchema.parse(loginData)

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) {
        return null
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
        return null
    }

    return { id: user.id, username: user.username, email: user.email }
}
