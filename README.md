Feito com Fastify 

execute primeiro : `npm install`

Executar projeto: `npm run dev`

## Rotas possiveis do sistema

* /photographer
    * post
        * {
            nome: string,
            apelido: string,
            dataNascimento: date,
            email: string,
            cpf: string
            }

* /photographer/:cpfPhotographer
    * put
        * {
            apelido: string,
            email: string
            }
    * get
    * delete

* /client
    * post
        * {
            nome: string,
            apelido: string,
            email: string,
            cpf: string
            }
    * get
            
* /client/:cpfClient
    * put
        * {
            apelido: string,
            email: string
            }
    * get
    * delete

* /photo/
    * get

* /photo/:cpfPhotographer
    * post
        * {
            url: string,
            price: number
            }
    * get

* /photo/:cpfPhotographer/:idPhoto
    * post
        * {
            price: number
            }
    * delete

<hr>

* /client/validation
    * post
        * { email: string }
        
* /photographer/validation
    * post
        * { email: string }