"use server"

import { signOut as auth_signOut } from "."

export async function signOut() {
    return await auth_signOut()
}
