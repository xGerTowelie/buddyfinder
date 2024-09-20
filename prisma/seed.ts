// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
    // Create users
    const users = await Promise.all(
        [
            { nickname: 'towelie', age: 25, gender: 'Other', location: 'South Park' },
            { nickname: 'cartman', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'stan', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'kyle', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'kenny', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'butters', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'wendy', age: 10, gender: 'Female', location: 'South Park' },
            { nickname: 'bebe', age: 10, gender: 'Female', location: 'South Park' },
            { nickname: 'timmy', age: 10, gender: 'Male', location: 'South Park' },
            { nickname: 'jimmy', age: 10, gender: 'Male', location: 'South Park' },
        ].map(async (userData) => {
            return prisma.user.create({
                data: {
                    ...userData,
                    keywords: {
                        create: [
                            { word: 'South Park', description: 'I live in South Park and love it here!' },
                            { word: 'Cartoon', description: 'I\'m a character in a popular animated TV show.' },
                        ],
                    },
                    topKeywords: {
                        create: [
                            { word: 'Friend', description: 'I value friendship above all else.', rank: 1 },
                            { word: 'Adventure', description: 'I love going on wild adventures!', rank: 2 },
                            { word: 'Humor', description: 'I appreciate a good laugh and witty jokes.', rank: 3 },
                            { word: 'School', description: 'I attend South Park Elementary.', rank: 4 },
                            { word: 'Family', description: 'Family is important to me.', rank: 5 },
                        ],
                    },
                    icebreakers: {
                        create: [
                            { question: 'What\'s your favorite South Park episode?' },
                            { question: 'If you could have any superpower, what would it be?' },
                        ],
                    },
                },
            })
        })
    )

    const towelie = users[0]

    // Create friend requests
    await Promise.all(
        users.slice(1, 6).map((user) =>
            prisma.friendRequest.create({
                data: {
                    senderId: user.id,
                    receiverId: towelie.id,
                    status: 'pending',
                },
            })
        )
    )

    // Accept some friend requests
    await Promise.all(
        users.slice(1, 4).map((user) =>
            prisma.friendRequest.create({
                data: {
                    senderId: towelie.id,
                    receiverId: user.id,
                    status: 'accepted',
                },
            })
        )
    )

    // Create messages
    const messages = [
        "Don't forget to bring a towel!",
        "You wanna get high?",
        "I have no idea what's going on.",
        "I'm so high right now, I have no idea what's goin' on.",
        "That's my secret cap, I'm always high.",
    ]

    await Promise.all(
        users.slice(1, 4).flatMap((user) =>
            messages.map((content) =>
                prisma.message.create({
                    data: {
                        content,
                        senderId: Math.random() > 0.5 ? towelie.id : user.id,
                        receiverId: Math.random() > 0.5 ? towelie.id : user.id,
                    },
                })
            )
        )
    )

    console.log('Seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
