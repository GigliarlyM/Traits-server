import { MongooseError } from 'mongoose';
import clientShema from './client-schema';
import { Client } from './interface-data';

interface ClientAlter {
    apelido: string,
    email: string
}

async function createClientModel(newClient: Client) {
    const client = await clientShema.create(newClient)

    return client

}

async function readClientModelUnique(cpfClient: string) {
    const client = await clientShema.findOne({ cpf: cpfClient })

    if (!client) throw new Error(`Nao existe client com esse cpf`)

    return client
}

async function readClientModelAll() {
    const listClient = await clientShema.find()

    if (!listClient) throw new Error(`Sistema sem cliente cadastrado!`)

    return listClient
}

async function updateClientModel(cpfClient: string, clientAlt: ClientAlter) {
    const client = await clientShema.findOneAndUpdate({ cpf: cpfClient }, clientAlt)

    if (!client) throw new Error(`Nao existe cliente com esse cpf`)

    return client
}

async function deleteClientModel(cpfClient: string) {
    await clientShema.findOneAndDelete({ cpf: cpfClient })
}

export {
    createClientModel, deleteClientModel, readClientModelAll, readClientModelUnique, updateClientModel
};

