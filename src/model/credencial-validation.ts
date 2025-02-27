import clientShema from "./client-schema"
import photographerShcema from "./photographer-schema"

async function validationPhotographerModel(email: string) {
    const photographer = await photographerShcema.findOne({email: email})

    if (!photographer) throw new Error(`Nao existe photographer com esse email`)

    return photographer
}

async function validationClientModel(email: string) {
    const client = await clientShema.findOne({email: email})

    if (!client) throw new Error(`Nao existe cliente com esse email`)

    return client
}

export {
    validationPhotographerModel,
    validationClientModel
}