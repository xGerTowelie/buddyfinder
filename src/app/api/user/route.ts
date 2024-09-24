import { NextResponse } from 'next/server'
import { getLoggedInUser } from '@/server/actions'

export async function GET() {
    try {
        const user = await getLoggedInUser()
        return NextResponse.json({
            id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
    }
}
