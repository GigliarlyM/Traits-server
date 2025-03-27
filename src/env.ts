import z from "zod";
import dotenv from "dotenv"
dotenv.config()
import { env } from "node:process";

const envTransform = z.object({
    PORT: z.coerce.number().default(8080),
    SECRET: z.string(),
    MONGO_URI: z.string(),
    MONGO_URI_ONLINE: z.string()
})

export const envTranformed = envTransform.parse(env)