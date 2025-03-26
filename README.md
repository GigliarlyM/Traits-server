# FotoHub

Feito com Fastify 

execute primeiro : `npm install`

Executar projeto: `npm run dev`

## Requisitos

- TypeScript
    - tsx
    - typescript
    - @types/
        - jsonwebtoken
        - mongoose
        - node
- fastify
- fastify-jwt
- fastify-type-provider-zod
- jsonwebtoken
- mongoose
- zod
- dotenv
- @fastify/
    - cors
    - jwt

## Diagrama

```mermaid
classDiagram
    class Artista {
        +List~Arte~ artes
    }
    class Arte {
        +String titulo
        +String descricao
        +String imagem
        +float valor
        +String genero
        +float desconto
        +List~Artista~ artista
    }
    class Pagamentos {
	    +String quemPediu
	    +List~Arte~ quaisItem
	    +boolean status
	    +int quantidade
	    +float valorItem
	    +String formaPagamento
    }
    class Cliente {
	    +String nome
	    +int idade
	    +String gmail
	    +String senha
    }
    Artista "*" <--> "*" Arte : possui
    Cliente "1" --> "1" Artista : conta
    Pagamentos "0" --> "*" Arte : possui
    Cliente "1" --> "*" Pagamentos : consta
```
