import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await getLoggedInUser()
        const { id } = params
        await prisma.notification.update({
            where: {
                id: id,
                userId: user.id
            },
            data: {
                isRead: true
            }
        })
        return NextResponse.json({ message: 'Notification marked as read' })
    } catch (error) {
        console.error('Failed to mark notification as read:', error)
        return NextResponse.json({ error: 'Failed to mark notification as read' }, { status: 500 })
    }
}
