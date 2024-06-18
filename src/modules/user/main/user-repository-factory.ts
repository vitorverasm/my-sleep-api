import { PrismaClient } from '@prisma/client';
import UserRepository from "../data/user-repository";

export function makeUserRepository() {
    const prisma = new PrismaClient()
    return new UserRepository(prisma.user);
}
