import z from "zod";
import dotenv from "dotenv"

dotenv.config()

const envTransform = z.object({
    PORT: z.coerce.number().default(8080),
    SECRET: z.string(),
    MONGO_URI: z.string()
})

export const env = envTransform.parse(process.env)