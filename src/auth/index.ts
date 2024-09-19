import NextAuth, { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { validateUser, LoginInput } from "@/lib/auth"

export const BASE_PATH = "/api/auth"

const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                const typedCredentials = credentials as Record<"email" | "password", string>

                if (!typedCredentials.email || !typedCredentials.password) {
                    return null
                }

                const loginData: LoginInput = {
                    email: typedCredentials.email,
                    password: typedCredentials.password,
                }

                const user = await validateUser(loginData)

                if (user) {
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                    }
                }

                console.log("Invalid credentials provided:", typedCredentials.email)
                return null
            }
        })
    ],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    }
}

export const { handlers, auth, signOut } = NextAuth(authConfig)
