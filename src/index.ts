import env from "./config/env";
import { startHTTPServer } from "./http/server";

startHTTPServer(env.SERVER_PORT);
