import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const user = await getLoggedInUser()
        const { chatId } = params

        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return NextResponse.json(messages)
    } catch (error) {
        console.error('Failed to fetch messages:', error)
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}

export async function POST(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const user = await getLoggedInUser()
        const { chatId } = params
        const { content } = await req.json()

        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { participants: true }
        })

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
        }

        const message = await prisma.message.create({
            data: {
                content,
                senderId: user.id,
                chatId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                }
            }
        })

        // Create notifications for other participants
        const otherParticipants = chat.participants.filter(p => p.id !== user.id)
        await prisma.notification.createMany({
            data: otherParticipants.map(participant => ({
                userId: participant.id,
                content: `New message from ${user.username}: ${content.substring(0, 50)}...`,
                type: 'NEW_MESSAGE',
                chatId: chatId
            }))
        })

        return NextResponse.json(message)
    } catch (error) {
        console.error('Failed to create message:', error)
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
    }
}
