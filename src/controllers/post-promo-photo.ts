import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { aplyPromoModel } from "../model/service";

export default async function postPromoPhoto(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/photo/:cpfPhotographer/:idPhoto', {
        schema: {
            params: z.object({
                cpfPhotographer: z.string(),
                idPhoto: z.coerce.number()
            }),
            body: z.object({
                priceAlt: z.coerce.number()
            })
        }
    }, async (request) => {
        const { idPhoto, cpfPhotographer } = request.params;
        const { priceAlt } = request.body;

        // @TODO: fazer um sistema para verificar cpf antes de aplicar a promo
        const decimalPromo = await aplyPromoModel(idPhoto, cpfPhotographer, priceAlt)
        
        return { decimalPromo }
    })
}