import { z } from "zod";

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;


export { User, UserSchema }
