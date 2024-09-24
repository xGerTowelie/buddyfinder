import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})
    await prisma.message.deleteMany({})
    await prisma.keyword.deleteMany({})
    await prisma.icebreaker.deleteMany({})
    await prisma.topKeyword.deleteMany({})
    await prisma.friendRequest.deleteMany({})
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
