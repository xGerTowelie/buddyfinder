import NextAuth, { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { validateUser, LoginInput } from "@/lib/auth"


export const BASE_PATH = "/api/auth"


const authConfig: NextAuthConfig = {
    providers: [

        // Manual Registration
        Credentials({
            name: "Credentials",

            // Define Signin Form
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },

            // Runs when authentication needs to be checked
            async authorize(cred): Promise<User | null> {
                const credentials = cred as Record<"username" | "password", string>

                // Missing Inputs
                if (!credentials.password || !credentials.username) {
                    return null
                }

                // Try Login
                const loginData: LoginInput = {
                    username: credentials.username,
                    password: credentials.password,
                }
                const user = await validateUser(loginData)

                // Success
                if (user) {
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                    }
                }

                // Error
                console.log("Invalid credentials provided:", credentials)
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
