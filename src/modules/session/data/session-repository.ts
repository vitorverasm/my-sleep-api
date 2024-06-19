import { PrismaClient } from "@prisma/client";
import z from "zod";
import Repository from "../../../database/types/repository.type";
import { SleepSession, SleepSessionSchema } from "../types/sleep-session.type";
import { User } from "../../user/types/user.type";

export default class SessionRepository implements Repository<SleepSession> {
    client: PrismaClient["sleepSession"];

    constructor(client: PrismaClient["sleepSession"]) {
        this.client = client;
    }

    async getAllByUserId(userId: User["id"]): Promise<SleepSession[]> {
        const sleepSessions = await this.client.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                ts: true,
                stages: true,
                score: true,
                timeseries: true
            }
        });
        return z.array(SleepSessionSchema).parse(sleepSessions)
    }
}
