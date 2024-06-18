import { PrismaClient } from '@prisma/client'
import { generateUser } from '../src/modules/user/mocks/generate-user'

const prisma = new PrismaClient()

async function main() {
    const users = Array.from({ length: 10 }).map(() => generateUser())

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
