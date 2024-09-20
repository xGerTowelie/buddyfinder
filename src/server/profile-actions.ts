// app/actions/profile-actions.ts

'use server'

import prisma from '@/lib/prisma'

export async function updateProfile(userId: string, profileData: any) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                nickname: profileData.nickname,
                age: profileData.age,
                gender: profileData.gender,
                location: profileData.location,
                showAge: profileData.showAge,
                showGender: profileData.showGender,
                showLocation: profileData.showLocation,
            },
        })

        // Update keywords
        await prisma.keyword.deleteMany({ where: { userId } })
        await prisma.keyword.createMany({
            data: profileData.keywords.map((keyword: any) => ({
                ...keyword,
                userId,
            })),
        })

        // Update top keywords
        await prisma.topKeyword.deleteMany({ where: { userId } })
        await prisma.topKeyword.createMany({
            data: profileData.topKeywords.map((keyword: any, index: number) => ({
                ...keyword,
                rank: index + 1,
                userId,
            })),
        })

        // Update icebreakers
        await prisma.icebreaker.deleteMany({ where: { userId } })
        await prisma.icebreaker.createMany({
            data: profileData.icebreakers.map((question: string) => ({
                question,
                userId,
            })),
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to update profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}

export async function getProfile(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                keywords: true,
                topKeywords: {
                    orderBy: { rank: 'asc' },
                },
                icebreakers: true,
            },
        })

        if (!user) {
            throw new Error('User not found')
        }

        return {
            ...user,
            topKeywords: user.topKeywords.map(({ rank, ...rest }) => rest),
            icebreakers: user.icebreakers.map((icebreaker) => icebreaker.question),
        }
    } catch (error) {
        console.error('Failed to get profile:', error)
        return null
    }
}
