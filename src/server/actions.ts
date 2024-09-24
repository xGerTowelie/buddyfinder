"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function getLoggedInUser() {
    const session = await auth()
    console.log('logged in user', session)

    if (!session || !session.user) {
        throw new Error('Please Sign in')
    }

    const email = session.user.email

    if (!email) {
        throw new Error('Currents session user has no email!')
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        throw new Error('No user is linked with that email')
    }

    return user
}
