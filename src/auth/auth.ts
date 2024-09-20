"use server"

import { signOut as auth_signOut } from "@/auth/index"

export async function signOut() {
    return await auth_signOut()
}

