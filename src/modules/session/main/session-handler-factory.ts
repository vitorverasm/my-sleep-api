import Repository from "../../../database/types/repository.type";
import SessionHandler from "../session-handler";
import { SleepSession } from "../types/sleep-session.type";

export function makeSessionHandler(sessionRepository: Repository<SleepSession>) {
    return new SessionHandler(sessionRepository);
}
