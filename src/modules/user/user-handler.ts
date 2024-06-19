import Repository from "../../database/types/repository.type";
import { User } from "./types/user.type";

export default class UserHandler {
    userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        if (!this.userRepository.getAll) {
            throw new Error("Method UserRepository/getAll not implemented");
        }
        return this.userRepository.getAll();
    }
}
