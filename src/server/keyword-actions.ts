'use server'

import prisma from "@/lib/prisma"

export async function addKeyword(userId: string, keyword: string) {
    try {
        await prisma.keyword.create({
            data: {
                text: keyword,
                userId: userId,
            },
        })
        return { success: true }
    } catch (error) {
        console.error('Failed to add keyword:', error)
        return { success: false, error: 'Failed to add keyword' }
    }
}

export async function getKeywordSuggestions(partialKeyword: string) {
    console.log('get some keywords')
    try {
        const keywords = await prisma.keyword.findMany({
            where: {
                text: {
                    contains: partialKeyword,
                    mode: 'insensitive',
                },
            },
            distinct: ['text'],
            take: 5,
        })
        return keywords.map(k => k.text)
    } catch (error) {
        console.error('Failed to get keyword suggestions:', error)
        return []
    }
}
