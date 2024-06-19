import fastify from "fastify";
import { GetUserSessionsRequest, GetUserSessionsRequestSchema } from "../modules/session/types/get-user-sessions-request.type";
import { makeUserHandler } from "../modules/user/main/user-handler-factory";
import { makeUserRepository } from "../modules/user/main/user-repository-factory";
import { makeSessionHandler } from "../modules/session/main/session-handler-factory";
import { makeSessionRepository } from "../modules/session/main/session-repository-factory";

export function startHTTPServer(port: number) {
    const server = fastify();
    const userHandler = makeUserHandler(makeUserRepository())
    const sessionHandler = makeSessionHandler(makeSessionRepository())

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
                return response.code(400).send({ users: [], message: `Failed to get users. Error: ${error.message}` })
            }
            return response.code(400).send({ users: [], message: "Failed to get users" })
        }
    })

    server.get("/:userId/sessions", async (request, response) => {
        try {
            const { userId } = request.params as GetUserSessionsRequest;
            GetUserSessionsRequestSchema.parse({ userId })
            const sessions = await sessionHandler.getAllByUserId(userId)
            return response.code(200).send({ intervals: sessions, message: "Sleep sessions list" })
        } catch (error) {
            if (error instanceof Error) {
                console.log("/users [error]: ", error.message)
                return response.code(400).send({ users: [], message: `Failed to get sessions. Error: ${error.message}` })
            }
            return response.code(400).send({ users: [], message: "Failed to get users" })
        }
    })

    server.listen({ port, host: "0.0.0.0" }).then(() => {
        console.log(`HTTP server running on port ${port}...`)
    })
}
