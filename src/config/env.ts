import { z } from 'zod'

const envSchema = z.object({
    SERVER_PORT: z.coerce.number().min(3000),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_PORT: z.coerce.number().min(3000),
})

const env = envSchema.parse(process.env)

export default env
