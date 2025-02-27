import { Employee } from './interface-data';
import photographerShcema from './photographer-schema';

interface EmployeeAlter {
    apelido: string,
    email: string
}

async function createPhotographerModel(newEmployee: Employee) {
    const photographer = await photographerShcema.create(newEmployee)

    return photographer
}

async function getPhotographerUnique(cpfPpher: string) {
    const photographer = await photographerShcema.findOne({ cpf: cpfPpher })

    if (!photographer) throw new Error(`Nao existe photographer com esse cpf`)

    return photographer
}

async function updatePhotographerModel(cpfPpher: string, employee: EmployeeAlter) {
    const photographer = await photographerShcema.findOneAndUpdate({ cpf: cpfPpher }, employee)

    if (!photographer) throw new Error(`Nao existe photographer com esse cpf`)

    return photographer
}

async function deletePhotographerModel(cpfPpher: string) {
    await photographerShcema.findOneAndDelete({ cpf: cpfPpher })
}

export {
    createPhotographerModel, deletePhotographerModel, getPhotographerUnique,
    updatePhotographerModel
};

