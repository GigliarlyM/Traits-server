interface Client extends Object {
    nome: string,
    apelido: string,
    email: string,
    cpf: string
}

interface Photo extends Object {
    id: number,
    url: string,
    photographerCpf: string,
    price: number,
    promo: number // Valor em Decimal que sera aplicado em price
}

interface Employee extends Object {
    nome: string,
    apelido: string,
    dataNascimento: Date,
    email: string,
    cpf: string,
    role: string
}

export {
    Client, Employee,
    Photo
}

