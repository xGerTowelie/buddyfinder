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

        return NextResponse.json(message)
    } catch (error) {
        console.error('Failed to create message:', error)
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
    }
}
