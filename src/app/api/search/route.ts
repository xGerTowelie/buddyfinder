import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const keywords = searchParams.get('keywords')?.split(',') || []

    try {
        const users = await prisma.user.findMany({
            where: {
                keywords: {
                    some: {
                        word: {
                            in: keywords,
                            mode: 'insensitive',
                        },
                    },
                },
            },
            include: {
                keywords: true,
            },
        })

        // Sort users by the number of matching keywords
        const sortedUsers = users.sort((a, b) => {
            const aMatches = a.keywords.filter(k => keywords.includes(k.word.toLowerCase())).length
            const bMatches = b.keywords.filter(k => keywords.includes(k.word.toLowerCase())).length
            return bMatches - aMatches
        })

        // Remove sensitive information and add matchingKeywords count
        const sanitizedUsers = sortedUsers.map(user => ({
            id: user.id,
            nickname: user.nickname,
            username: user.username,
            profileImage: user.profileImage,
            keywords: user.keywords.map(k => k.word),
            matchingKeywords: user.keywords.filter(k => keywords.includes(k.word.toLowerCase())).length,
        }))

        return NextResponse.json(sanitizedUsers)
    } catch (error) {
        console.error('Error searching users:', error)
        return NextResponse.json({ error: 'Failed to search users' }, { status: 500 })
    }
}
