// server/profile-actions.ts
'use server'

import prisma from '@/lib/prisma'
import { getLoggedInUser } from './actions'
import { Profile, ProfileSchema } from '@/lib/validation'

export async function updateProfile(profileData: Profile) {
    const user = await getLoggedInUser()

    try {
        const validatedData = ProfileSchema.parse(profileData)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                nickname: validatedData.nickname,
                age: validatedData.age,
                gender: validatedData.gender,
                location: validatedData.location,
                showAge: validatedData.showAge,
                showGender: validatedData.showGender,
                showLocation: validatedData.showLocation,
                profileImage: validatedData.profileImage,
            },
        })


        // Update keywords
        await prisma.keyword.deleteMany({ where: { userId: user.id } })
        await prisma.keyword.createMany({
            data: validatedData.keywords.map((keyword) => ({
                ...keyword,
                userId: user.id,
            })),
        })

        // Update top keywords
        await prisma.topKeyword.deleteMany({ where: { userId: user.id } })
        await prisma.topKeyword.createMany({
            data: validatedData.topKeywords.map((keyword, index) => ({
                ...keyword,
                rank: index + 1,
                userId: user.id,
            })),
        })

        // Update icebreakers
        await prisma.icebreaker.deleteMany({ where: { userId: user.id } })
        await prisma.icebreaker.createMany({
            data: validatedData.icebreakers.map((question) => ({
                question,
                userId: user.id,
            })),
        })
        return { success: true }
    } catch (error) {
        console.error('Failed to update profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}


export async function uploadProfileImage(file: File) {
    const user = await getLoggedInUser()

    try {
        const { url } = await put(`profile-images/${user.id}`, file, {
            access: 'public',
        })

        await prisma.user.update({
            where: { id: user.id },
            data: { profileImage: url },
        })

        return { success: true, url }
    } catch (error) {
        console.error('Failed to upload profile image:', error)
        return { success: false, error: 'Failed to upload profile image' }
    }
}
export async function getProfile(): Promise<Profile | null> {
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
