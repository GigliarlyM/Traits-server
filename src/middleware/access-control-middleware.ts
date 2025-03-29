import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../controllers/token/generate-token";

export default function accessControllMiddleware(
    request: FastifyRequest,
    reply: FastifyReply,
    done: (err?: Error) => void
) {
    const { url, method } = request
    const publicRoutes = [
        { method: "POST", url: ["/artist", "/client", "/login"] },
        { method: "GET", url: ["/art/artist/:userName", "/art"] },
    ]

    const isPublicRoute = publicRoutes.some(
        (route) => route.url.includes(url) && route.method === method
    )

    if (isPublicRoute) {
        return done();
    }

    const authorizationHeader = request.headers.authorization?.split(" ")[1]

    if (!authorizationHeader) {
        reply.status(401).send({ message: "Token de autenticação necessário!" });
        return;
    }

    verifyToken(authorizationHeader).then(() =>
        done()
    ).catch(() =>
        reply.status(403).send({ message: "Acesso restrito!" })
    )

}
