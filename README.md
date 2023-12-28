# API README

Esta é uma API desenvolvida utilizando Express e Prisma para gerenciar usuários, perfis e posts. Abaixo estão listadas as principais funcionalidades da aplicação, bem como as rotas disponíveis.

## Funcionalidades

- **Rota base**
  - `http://localhost:8000/api`

### Controle de Usuário

- **Criar Usuário**
  - Método: `POST`
  - Rota: `/user`

- **Visualizar Usuários**
  - Método: `GET`
  - Rota: `/user`

- **Buscar Usuário por ID**
  - Método: `GET`
  - Rota: `/user/:id`

- **Atualizar Informações do Usuário**
  - Método: `PATCH`
  - Rota: `/user/:id`

- **Deletar Usuário**
  - Método: `DELETE`
  - Rota: `/user/:id`

### Controle de Perfil

- **Criar Perfil**
  - Método: `POST`
  - Rota: `/profile`

- **Atualizar Perfil**
  - Método: `PATCH`
  - Rota: `/profile/:id`

- **Deletar Perfil**
  - Método: `DELETE`
  - Rota: `/profile/:id`

### Controle de Postagem

- **Criar Postagem**
  - Método: `POST`
  - Rota: `/post`

- **Visualizar Todas as Postagens**
  - Método: `GET`
  - Rota: `/post`

- **Visualizar Postagens de um Usuário Específico**
  - Método: `GET`
  - Rota: `/post/me/:id`

- **Buscar Postagem por ID**
  - Método: `GET`
  - Rota: `/post/:id`

- **Atualizar Postagem**
  - Método: `PATCH`
  - Rota: `/post/:id`

- **Publicar Postagem**
  - Método: `PATCH`
  - Rota: `/post/publish/:id`

- **Deletar Postagem**
  - Método: `DELETE`
  - Rota: `/post/:id`

- **Deletar Todas as Postagens de um Usuário**
  - Método: `DELETE`
  - Rota: `/post/all/:id`

## Como Executar

1. Clone este repositório.
2. Instale as dependências usando `npm install`.
3. Configure o banco de dados no arquivo `.env`.
4. Em caso de dúvida, acesse a [documentação](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql) para saber como conectar ao seus banco.
5. Execute o servidor usando `npm start`.
6. Acesse as rotas conforme descrito acima.