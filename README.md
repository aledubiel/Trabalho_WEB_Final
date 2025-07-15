# Trabalho_WEB_Final

Este projeto é uma aplicação web full stack desenvolvida como trabalho final da disciplina, demonstrando funcionalidades completas de CRUD (Create, Read, Update, Delete).

1. Domínio de Negócio
O domínio de negócio escolhido é a Gestão de Animais de ONG, com foco nas seguintes entidades:
- Animal: Representa um animal resgatado ou sob os cuidados de uma ONG.
- ONG: Representa a organização não governamental responsável pelos animais e usuários.;
- Usuário: Representa um usuário do sistema, que pode estar associado a uma ONG.

2. Como Rodar o Projeto
- Pré-requisitos
Node.js
npm ou Yarn

- Configuração do Backend
Navegue até a pasta back-end:
cd back-end

- Instale as dependências:
npm install ou yarn install

- Gere o Prisma Client:
npx prisma generate

- Execute as migrações do banco de dados:
npx prisma migrate dev --name initial_migration

- Inicie o servidor backend:
npm run start:dev ou yarn start:dev

- Configuração do Frontend
Abra um novo terminal e navegue até a pasta front-end:
cd front-end

- Instale as dependências:
npm install ou yarn install

- Inicie a aplicação frontend:
npm run dev ou yarn dev

A aplicação estará disponível em http://localhost:3001 (ou a porta alternativa que o Next.js indicar).
