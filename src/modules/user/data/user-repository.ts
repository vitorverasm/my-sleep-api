import { PrismaClient } from "@prisma/client";
import z from "zod";
import Repository from "../../../database/types/repository.type";
import { User, UserSchema } from "../types/user.type";

export default class UserRepository implements Repository<User> {
    client: PrismaClient["user"];

    constructor(client: PrismaClient["user"]) {
        this.client = client;
    }

    async getAll(): Promise<User[]> {
        const users = await this.client.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                sleepSessions: false
            }
        });
        return z.array(UserSchema).parse(users)
    }
}
