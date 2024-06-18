import Repository from "../../../database/types/repository.type";
import { User } from "../types/user.type";
import UserHandler from "../user-handler";

export function makeUserHandler(userRepository: Repository<User>) {
    return new UserHandler(userRepository);
}
