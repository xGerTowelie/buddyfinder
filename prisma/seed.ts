import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create users
    const users = await Promise.all([
        createUser('alice', 'alice@example.com', 'password123', 'Alice Johnson', 25, 'Female', 'New York'),
        createUser('bob', 'bob@example.com', 'password456', 'Bob Smith', 30, 'Male', 'Los Angeles'),
        createUser('charlie', 'charlie@example.com', 'password789', 'Charlie Brown', 28, 'Male', 'Chicago'),
        createUser('diana', 'diana@example.com', 'passwordabc', 'Diana Lee', 27, 'Female', 'San Francisco'),
    ])

    // Add keywords, top keywords, and icebreakers for each user
    for (const user of users) {
        await addUserDetails(user.id)
    }

    // Create friend requests
    await createFriendRequests(users)

    // Create chats and messages
    await createChatsAndMessages(users)

    console.log('Seed data has been successfully added to the database.')
}

async function createUser(username: string, email: string, password: string, nickname: string, age: number, gender: string, location: string) {
    const hashedPassword = await hash(password, 10)
    return prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            nickname,
            age,
            gender,
            location,
            profileImage: `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`,
            showAge: true,
            showGender: true,
            showLocation: true,
            publicProfile: true,
            emailNotifications: true,
            pushNotifications: true,
            language: 'en',
        },
    })
}

async function addUserDetails(userId: string) {
    // Add keywords
    const keywords = [
        { word: 'Travel', description: 'I love exploring new places and cultures.' },
        { word: 'Music', description: 'Music is my passion, I play guitar and piano.' },
        { word: 'Technology', description: 'I\'m a tech enthusiast and always excited about new gadgets.' },
        { word: 'Cooking', description: 'I enjoy experimenting with different cuisines in the kitchen.' },
        { word: 'Fitness', description: 'Staying healthy and active is important to me.' },
    ]

    await prisma.keyword.createMany({
        data: keywords.map(keyword => ({ ...keyword, userId })),
    })

    // Add top keywords
    const topKeywords = keywords.slice(0, 3)
    await prisma.topKeyword.createMany({
        data: topKeywords.map((keyword, index) => ({
            word: keyword.word,
            rank: index + 1,
            userId
        })),
    })

    // Add icebreakers
    const icebreakers = [
        'What\'s your favorite travel destination?',
        'If you could master any musical instrument, which would it be?',
        'What\'s the most exciting tech innovation you\'ve seen recently?',
    ]

    await prisma.icebreaker.createMany({
        data: icebreakers.map(question => ({ question, userId })),
    })
}

async function createFriendRequests(users: any[]) {
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            await prisma.friendRequest.create({
                data: {
                    senderId: users[i].id,
                    receiverId: users[j].id,
                    status: 'pending',
                },
            })
        }
    }
}

async function createChatsAndMessages(users: any[]) {
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            const chat = await prisma.chat.create({
                data: {
                    participants: {
                        connect: [{ id: users[i].id }, { id: users[j].id }],
                    },
                },
            })

            // Create some messages for each chat
            const messages = [
                `Hey ${users[j].nickname}, how are you?`,
                `Hi ${users[i].nickname}! I'm doing great, thanks for asking. How about you?`,
                'I\'m good too! Want to grab coffee sometime?',
                'Sounds great! How about this weekend?',
            ]

            for (let k = 0; k < messages.length; k++) {
                await prisma.message.create({
                    data: {
                        content: messages[k],
                        senderId: k % 2 === 0 ? users[i].id : users[j].id,
                        chatId: chat.id,
                    },
                })
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
