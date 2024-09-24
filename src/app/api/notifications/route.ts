import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function GET() {
    try {
        const user = await getLoggedInUser()
        const notifications = await prisma.notification.findMany({
            where: {
                userId: user.id,
                isRead: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(notifications)
    } catch (error) {
        console.error('Failed to fetch notifications:', error)
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
    }
}
