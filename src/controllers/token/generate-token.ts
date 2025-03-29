import jwt from "jsonwebtoken"
import { envTranformed } from "../../env";


function generateToken(payload: object) {
    return new Promise((resolve, rejects) => {
        jwt.sign(payload, envTranformed.SECRET, (err, token) => {
            if (err) rejects(err);

            resolve(token);
        })
    })
}

function verifyToken(playload: string) {
    return new Promise((resolve, rejects) => {
        jwt.verify(playload, envTranformed.SECRET, (err, decoded) => {
            if (err) rejects(err);

            resolve(decoded)
        })
    })
}

export {
    generateToken,
    verifyToken
}