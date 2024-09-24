'use server'

import prisma from '@/lib/prisma'
import { getLoggedInUser } from './actions'
import { z } from 'zod'

const SettingsSchema = z.object({
    nickname: z.string().min(1, "Nickname is required"),
    email: z.string().email("Invalid email address"),
    publicProfile: z.boolean(),
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    language: z.string().min(2, "Language is required"),
})

type SettingsInput = z.infer<typeof SettingsSchema>

export async function updateSettings(settingsData: SettingsInput) {
    const user = await getLoggedInUser()

    try {
        const validatedData = SettingsSchema.parse(settingsData)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                nickname: validatedData.nickname,
                email: validatedData.email,
                publicProfile: validatedData.publicProfile,
                emailNotifications: validatedData.emailNotifications,
                pushNotifications: validatedData.pushNotifications,
                language: validatedData.language,
            },
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to update settings:', error)
        return { success: false, error: 'Failed to update settings' }
    }
}

export async function getSettings() {
    const user = await getLoggedInUser()

    try {
        const settings = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                nickname: true,
                email: true,
                publicProfile: true,
                emailNotifications: true,
                pushNotifications: true,
                language: true,
            },
        })

        if (!settings) {
            throw new Error('Settings not found')
        }

        return settings
    } catch (error) {
        console.error('Failed to get settings:', error)
        return null
    }
}
