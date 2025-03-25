import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../controllers/token/generate-token";

export default function accessControllMiddleware(
    request: FastifyRequest,
    reply: FastifyReply,
    done: (err?: Error) => void
) {
    const {url, method} = request
    const publicRoutes = [
        {method: "POST", url: ["/artista"]},
        {method: "GET", url: ["/arte/artista/:userName", "/arte"]},
    ]
    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) {
        reply.status(401).send({ message: "Token de autenticação necessário!" });
        return;
    }

    let decoded = null;
    verifyToken(authorizationHeader).then((response) => {
        decoded = response
    })

    const isPublicRoute = publicRoutes.some(
        (route) => route.url.includes(url) && route.method === method
    )

    if (isPublicRoute || decoded) {
        done();
    } else {
        reply.status(403).send({ message: "Acesso restrito!" });
    }
}