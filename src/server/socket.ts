import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import prisma from '@/lib/prisma'

export function initializeSocket(httpServer: HttpServer) {
    const io = new Server(httpServer)

    io.on('connection', (socket) => {
        console.log('A user connected')

        socket.on('join chat', async (chatId) => {
            socket.join(chatId)
            console.log(`User joined chat: ${chatId}`)
        })

        socket.on('leave chat', (chatId) => {
            socket.leave(chatId)
            console.log(`User left chat: ${chatId}`)
        })

        socket.on('send message', async (data) => {
            const { content, senderId, chatId } = data
            try {
                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId,
                        chatId,
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                profileImage: true
                            }
                        }
                    }
                })
                io.to(chatId).emit('new message', message)
            } catch (error) {
                console.error('Error saving message:', error)
            }
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })

    return io
}
