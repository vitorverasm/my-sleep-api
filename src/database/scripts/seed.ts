import { PrismaClient } from '@prisma/client'
import { generateSleepSession, generateStages, generateTimeSeries } from '../../modules/session/tests/mocks/generate-sleep-session'
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
        const mockSessions = Array.from({ length: parameters.sessionsPerUser }).map(() => generateSleepSession(user.id))
        const sessions = await prisma.sleepSession.createManyAndReturn({
            data: mockSessions,
            skipDuplicates: true
        })

        sessions.map(async (session) => {
            const stages = generateStages(session.id, parameters.stagesPerSession)
            const timeSeries = generateTimeSeries(session.id, {
                amountOfTnt: parameters.amountOfTnt,
                amountOfTemperatureChanges: parameters.amountOfTemperatureChanges,
                amountOfHealthItems: parameters.amountOfHealthItems
            })

            await prisma.sleepStage.createMany({
                data: stages,
                skipDuplicates: true
            })

            await prisma.timeSeries.create({
                data: {
                    sleepSessionId: session.id,
                    tnt: timeSeries.tnt,
                    tempRoomC: timeSeries.tempRoomC,
                    tempBedC: timeSeries.tempBedC,
                    respiratoryRate: timeSeries.respiratoryRate,
                    heartRate: timeSeries.heartRate,
                }, include: {
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
