import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getLoggedInUser } from '@/server/actions'

export async function GET() {
    try {
        const user = await getLoggedInUser()
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: user.id
                    }
                }
            },
            include: {
                participants: {
                    where: {
                        id: {
                            not: user.id
                        }
                    },
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            }
        })

        return NextResponse.json(chats)
    } catch (error) {
        console.error('Failed to fetch chats:', error)
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const user = await getLoggedInUser()
        const { participantId } = await req.json()

        const chat = await prisma.chat.create({
            data: {
                participants: {
                    connect: [{ id: user.id }, { id: participantId }]
                }
            },
            include: {
                participants: {
                    where: {
                        id: {
                            not: user.id
                        }
                    },
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                }
            }
        })

        return NextResponse.json(chat)
    } catch (error) {
        console.error('Failed to create chat:', error)
        return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
    }
}
