import { faker } from "@faker-js/faker"
import { SleepSession } from "../../types/sleep-session.type"

export function generateSleepSession(userId: string): Omit<SleepSession, "id" | "stages" | "timeseries"> {
    return {
        ts: faker.date.recent().toISOString(),
        score: faker.number.int({ min: 0, max: 100 }),
        userId
    }
}

export function generateStages(sessionId: number, stageCount: number): SleepSession["stages"] {
    return Array.from({ length: stageCount }).map(() => ({
        duration: faker.number.int({ min: 100, max: 10 * 60 * 60 }),
        stage: faker.helpers.arrayElement(["awake", "out", "light", "deep"]),
        sleepSessionId: sessionId
    }))
}

export function generateTimeSeries(sessionId: number, params: {
    amountOfTnt?: number,
    amountOfTemperatureChanges?: number,
    amountOfHealthItems?: number
} = {
    }): SleepSession["timeseries"] {
    const amountOfTnt = params.amountOfTnt ?? faker.number.int({ min: 5, max: 10 })
    const amountOfTemperatureChanges = params.amountOfTemperatureChanges ?? faker.number.int({ min: 4, max: 6 })
    const amountOfHealthItems = params.amountOfHealthItems ?? faker.number.int({ min: 3, max: 5 })
    return {
        tnt: Array.from({ length: amountOfTnt }).map(() => ([
            faker.date.recent().toISOString(), faker.number.int({ min: 1, max: 3 })
        ])),
        tempRoomC: Array.from({ length: amountOfTemperatureChanges }).map(() => ([
            faker.date.recent().toISOString(), faker.number.float({ min: 1, max: 50 })
        ])),
        tempBedC: Array.from({ length: amountOfTemperatureChanges }).map(() => ([
            faker.date.recent().toISOString(), faker.number.float({ min: 1, max: 50 })
        ])),
        respiratoryRate: Array.from({ length: amountOfHealthItems }).map(() => ([
            faker.date.recent().toISOString(), faker.number.float({ min: 10, max: 25 })
        ])),
        heartRate: Array.from({ length: amountOfHealthItems }).map(() => ([
            faker.date.recent().toISOString(), faker.number.float({ min: 45, max: 100 })
        ])),
        heating: [],
        sleepSessionId: sessionId
    }
}
