import { PrismaClient } from '@prisma/client'
import { generateSleepSessions, generateStages, generateTimeSeries } from '../../modules/session/tests/mocks/generate-sleep-session'
import { generateUser } from '../../modules/user/tests/mocks/generate-user'

const parameters = {
    userCount: 10,
    sessionsPerUser: 5,
    stagesPerSession: 5,
    amountOfTnt: 5,
    amountOfTemperatureChanges: 5,
    amountOfHealthItems: 5
}

const prisma = new PrismaClient()

async function main() {
    const mockUsers = Array.from({ length: parameters.userCount }).map(() => generateUser())

    const users = await prisma.user.createManyAndReturn({
        data: mockUsers,
        skipDuplicates: true,
    })

    users.map(async (user) => {
        const mockSessions = generateSleepSessions(user.id, parameters.sessionsPerUser)
        const sessions = await prisma.sleepSession.createManyAndReturn({
            data: mockSessions,
            include: {
                user: true
            },
            skipDuplicates: true
        })

        sessions.map(async (session) => {
            const stages = generateStages(session.id, parameters.stagesPerSession)
            const timeSeries = generateTimeSeries(session.id, {
                amountOfTnt: parameters.amountOfTnt,
                amountOfTemperatureChanges: parameters.amountOfTemperatureChanges,
                amountOfHealthItems: parameters.amountOfHealthItems
            })

            await prisma.sleepStage.createManyAndReturn({
                data: stages,
                skipDuplicates: true,
                include: {
                    sleepSession: true
                }
            })

            await prisma.timeSeries.create({
                data: timeSeries,
                include: {
                    sleepSession: true
                }
            })
        })
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
