import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { getLoggedInUser } from '@/server/actions'

export async function POST(request: NextRequest) {
    try {
        const user = await getLoggedInUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save file to a public directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const uniqueFilename = `${user.id}-${Date.now()}-${file.name}`
        const filepath = path.join(uploadDir, uniqueFilename)
        await writeFile(filepath, buffer)

        // Generate the URL for the uploaded file
        const fileUrl = `/uploads/${uniqueFilename}`

        return NextResponse.json({ success: true, url: fileUrl })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }
}
