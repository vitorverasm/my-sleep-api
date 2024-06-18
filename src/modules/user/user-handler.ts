import Repository from "../../database/types/repository.type";
import { User } from "./types/user.type";

export default class UserHandler {
    userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return this.userRepository.getAll();
    }
}
