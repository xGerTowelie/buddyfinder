import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    try {
        const keywords = await prisma.keyword.findMany({
            where: {
                word: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            distinct: ['word'],
            take: 5,
            select: {
                word: true,
            },
        })

        const suggestions = keywords.map(keyword => keyword.word)
        return NextResponse.json(suggestions)
    } catch (error) {
        console.error('Error fetching keyword suggestions:', error)
        return NextResponse.json({ error: 'Failed to fetch keyword suggestions' }, { status: 500 })
    }
}
