'use server'

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { getLoggedInUser } from './actions'

export async function updateProfile(profileData: any) {
    const user = await getLoggedInUser()

    console.log("profile data sent via form:", profileData)

    try {
        await prisma.user.update({
            where: { id: user.id },
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
        /* await prisma.keyword.deleteMany({ where: { userId: user.id } })
        await prisma.keyword.createMany({
            data: profileData.keywords.map((keyword: any) => ({
                ...keyword,
                userId: user.id,
            })),
        }) */

        // Update top keywords
        /* await prisma.topKeyword.deleteMany({ where: { userId: user.id } })
        await prisma.topKeyword.createMany({
            data: profileData.topKeywords.map((keyword: any, index: number) => ({
                ...keyword,
                rank: index + 1,
                userId: user.id,
            })),
        }) */

        // Update icebreakers
        /*         await prisma.icebreaker.deleteMany({ where: { userId } })
                await prisma.icebreaker.createMany({
                    data: profileData.icebreakers.map((question: string) => ({
                        question,
                        userId: user.id,
                    })),
                })
         */
        return { success: true }
    } catch (error) {
        console.error('Failed to update profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}

export type SimpleKeyword = {
    word: string;
    description: string;
}

export type FullProfile = User & {
    keywords: SimpleKeyword[];
    topKeywords: SimpleKeyword[];
    icebreakers: string[];
}

export async function getProfile(): Promise<FullProfile | null> {
    const user = await getLoggedInUser()

    try {
        const profile = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                keywords: true,
                topKeywords: {
                    orderBy: { rank: 'asc' },
                },
                icebreakers: true,
            },
        })

        if (!profile) {
            throw new Error('Profile not found')
        }

        return {
            ...profile,
            keywords: profile.keywords.map(({ id, userId, ...rest }) => rest),
            topKeywords: profile.topKeywords.map(({ id, userId, rank, ...rest }) => rest),
            icebreakers: profile.icebreakers.map((icebreaker) => icebreaker.question),
        }
    } catch (error) {
        console.error('Failed to get profile:', error)
        return null
    }
}
