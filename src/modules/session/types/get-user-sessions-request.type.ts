import { z } from "zod";

const GetUserSessionsRequestSchema = z.object({
    userId: z.string().uuid(),
});

type GetUserSessionsRequest = z.infer<typeof GetUserSessionsRequestSchema>;

export { GetUserSessionsRequest, GetUserSessionsRequestSchema }
