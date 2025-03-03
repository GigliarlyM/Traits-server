import jwt from "jsonwebtoken"
import { env } from "../../env"

function generateToken(payload: object) {
    return new Promise((resolve, rejects) => {
        jwt.sign(payload, env.SECRET, (err, token) => {
            if (err) rejects(err);

            resolve(token);
        })
    })
}

function verifyToken(playload: string) {
    return new Promise((resolve, rejects) => {
        jwt.verify(playload, env.SECRET, (err, decoded) => {
            if (err) rejects(err);

            resolve(decoded)
        })
    })
}

export {
    generateToken,
    verifyToken
}