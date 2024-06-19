import { faker } from "@faker-js/faker";
import { User } from "../../types/user.type";

export function generateUser(): User {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }).toLocaleLowerCase(),
    }
}
