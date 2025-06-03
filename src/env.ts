import z from "zod";
import dotenv from "dotenv"
dotenv.config()
import { env } from "node:process";

const envTransform = z.object({
    PORT: z.coerce.number().default(8080),
    SECRET: z.string(),
    GOOGLE_GEMINI_API_KEY: z.string()
})

export const envTranformed = envTransform.parse(env)