import fastify from "fastify";

export function startHTTPServer(port: number) {
    const server = fastify();

    server.get("/", () => {
        return { message: "Hello, world!" }
    })

    server.listen({ port }).then(() => {
        console.log(`HTTP server running on port ${port}...`)
    })
}
