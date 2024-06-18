import fastify from "fastify";
import { makeUserHandler } from "../modules/user/main/user-handler-factory";
import { makeUserRepository } from "../modules/user/main/user-repository-factory";

export function startHTTPServer(port: number) {
    const server = fastify();
    const userHandler = makeUserHandler(makeUserRepository())

    server.get("/", (_, response) => {
        return response.code(200).send({ message: "Hello world" })
    })

    server.get("/users", async (_, response) => {
        try {
            const users = await userHandler.getAllUsers()
            return response.code(200).send({ users, message: "Users list" })
        } catch (error) {
            if (error instanceof Error) {
                console.log("/users [error]: ", error.message)
            }
            return response.code(400).send({ users: [], message: "Failed to get users" })
        }
    })

    server.listen({ port, host: "0.0.0.0" }).then(() => {
        console.log(`HTTP server running on port ${port}...`)
    })
}
