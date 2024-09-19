"use server"

import { auth } from "@/auth"

export async function getLoggedInUser() {
    const session = await auth()
    return session?.user?.email ?? null
}
