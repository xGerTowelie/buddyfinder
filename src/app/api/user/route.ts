import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function GET() {
    try {
        const currentUser = await getLoggedInUser()
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: currentUser.id // Exclude the current user
                }
            },
            select: {
                id: true,
                username: true,
                profileImage: true
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        console.error('Failed to fetch users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}
