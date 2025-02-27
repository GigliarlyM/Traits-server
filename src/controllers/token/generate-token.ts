import jwt from "jsonwebtoken"
import { env } from "../../env"

export default function generateToken(payload: object) {
    return new Promise((resolve, rejects) => {
        jwt.sign(payload, env.SECRET, (err, token) => {
            if (err) rejects(err);

            resolve(token);
        })
    })
}