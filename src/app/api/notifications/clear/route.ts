import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function POST() {
    try {
        const user = await getLoggedInUser()
        await prisma.notification.updateMany({
            where: {
                userId: user.id,
                isRead: false
            },
            data: {
                isRead: true
            }
        })
        return NextResponse.json({ message: 'All notifications marked as read' })
    } catch (error) {
        console.error('Failed to clear notifications:', error)
        return NextResponse.json({ error: 'Failed to clear notifications' }, { status: 500 })
    }
}
