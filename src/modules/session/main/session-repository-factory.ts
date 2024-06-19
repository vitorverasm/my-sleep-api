import { PrismaClient } from '@prisma/client';
import SessionRepository from '../data/session-repository';

export function makeSessionRepository() {
    const prisma = new PrismaClient()
    return new SessionRepository(prisma.sleepSession);
}
