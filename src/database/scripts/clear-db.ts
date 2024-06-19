import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$executeRaw`TRUNCATE TABLE "SleepStage", "TimeSeries", "SleepSession" ,"User" RESTART IDENTITY`
    console.log('All data deleted!')
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
