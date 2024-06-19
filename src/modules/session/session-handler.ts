import Repository from "../../database/types/repository.type";
import { User } from "../user/types/user.type";
import { SleepSession } from "./types/sleep-session.type";

export default class SessionHandler {
    sessionRepository: Repository<SleepSession>;

    constructor(sessionRepository: Repository<SleepSession>) {
        this.sessionRepository = sessionRepository;
    }

    async getAllByUserId(userId: User["id"]) {
        if (!this.sessionRepository.getAllByUserId) {
            throw new Error("Method SessionRepository/getAllByUserId not implemented");
        }
        return this.sessionRepository.getAllByUserId(userId);
    }
}
