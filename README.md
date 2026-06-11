# 🚀 Projeto de Onboarding - App Completo com NestJS + Next.js

Bem-vindo(a) ao time! Este projeto de onboarding foi criado para te ajudar a entender a stack que usamos, praticar desenvolvimento fullstack (backend e frontend) e aprender na prática com algo simples, real e divertido.

## 🎯 Objetivo

Desenvolver uma aplicação completa com:

- **Backend em NestJS + MongoDB**
- **Frontend em Next.js**

Você poderá escolher o tema do projeto livremente. A única exigência técnica é: ter **login, logout, cadastro e as 4 operações CRUD de um recurso principal** (ex: tarefas, receitas, filmes…).

## 🧠 O que você vai aprender

### Backend

- Geração e autenticação de **JWT**
- Criptografia de senhas com **bcrypt**
- Caching com **redis**
- Documentação de API com **swagger**
- Interação com uma ODM através do **mongoose**
- O que são, como implementar e como interagir com: modules | controllers | usecases | providers | repositories | schemas | guards
- Testes unitários e E2E com **100%** de cobertura

### Frontend

- Desenvolvimento com **React**
- Interação com formulários utilizando **zod** e **react-hook-form**
- Chamadas HTTP com **SWR**
- Utilização de componentes prontos com **MUI**

## 🧩 Ideias de tema (você escolhe)

| Tema                      | Descrição                                    |
| ------------------------- | -------------------------------------------- |
| ✅ Lista de Tarefas       | Título, descrição, status de concluída       |
| 🍳 Caderninho de Receitas | Ingredientes, modo de preparo, categoria     |
| 🎬 Catálogo de Filmes     | Nome, nota, gênero, ano assistido            |
| 📓 Diário de Humor        | Nota de humor, emoji, texto por dia          |
| 💸 Controle de Gastos     | Valor, categoria, tipo (entrada/saída), data |

> Sinta-se livre para fazer outro tema! Só precisa seguir a estrutura proposta em Endpoints obrigatórios.

## 🛠️ Stack

### Backend

- NestJS
- MongoDB
- Mongoose
- Swagger
- Bcrypt
- Redis

### Frontend

- Next.js
- React
- React-hook-form
- Zod
- SWR
- MUI
- scss

### Em ambos

- env-cmd
- Docker e Docker compose

## ✅ Endpoints obrigatórios

### Autenticação

- `POST /auth/signup` – Cadastro de usuário com senha criptografada
- `POST /auth/login` – Login com email/senha e retorno de JWT e salvar ele no redis
- `POST /auth/logout` - Invalidar token no redis _(Autenticado também)_

### CRUD

- `GET /nome_recurso (privado)` – Listar itens
- `POST /nome_recurso (privado)` – Criar item
- `PUT /nome_recurso/:id (privado)` – Atualizar item
- `DELETE /nome_recurso/:id (privado)` – Remover item

## 😵‍💫 Não sei nada dessa tecnologia, e agora?

Não tem problema não saber alguma tecnologia da nossa stack. Afinal de contas, um dos objetivos do projeto de onboarding é justamente esse: se familiarizar com ela. Contudo, sabemos que não é possível simplesmente sair fazendo algo em uma tecnologia que você nunca teve contato, então é importante dar uma lida no assunto antes de tentar implementar.

### NestJS

As seções [INTRODUCTION](https://docs.nestjs.com/) e [OVERVIEW](https://docs.nestjs.com/first-steps) são excelentes para entender como utilizar o framework.

### Next.js

Se você já sabe React, pode dar uma olhada no tutorial de [introdução a Next.js](https://nextjs.org/learn/dashboard-app)

Se você não sabe React, a mesma documentação tem o [tutorial de React](https://nextjs.org/learn/react-foundations)

Os materiais apresentados aqui são apenas uma sugestão. Se você não tem familiaridade com inglês ou prefere consumir outro tipo de conteúdo - como vídeos, por exemplo - fique a vontade. O objetivo é entender um pouco da stack para conseguir começar a construir enquanto aprende.

## 🚨 Observações

- Todos os endpoints privados devem exigir o token JWT no header `Authorization`.

- Boa parte do projeto já está implementada, pois o objetivo aqui é aprender os padrões e ferramentas que utilizamos no projeto. Inclusive, o código e a arquitetura já existente se parece bastante com o que você irá trabalhar. Recomendamos que dê uma olhada e tente entender.

- Não utilize nenhuma dependência externa além das mencionadas aqui. **Contudo**, não há nenhum problema em falar com seu padrinho sobre, caso você enxergar necessidade.

## 📁 Estrutura sugerida

### Backend

```
backend/
├── src/
│   ├── config/
│   ├── core/
│   ├──── constants/
│   ├──── guards/
│   ├──── helpers/
│   ├──── providers/
│   ├──── repositories/
│   ├────── nome_recurso/
│   ├──────── schemas/
│   ├──── validators/
│   ├── routes/
│   ├──── api/
│   ├────── nome_recurso/
│   ├──────── requests/
│   ├──────── responses/
│   ├──────── use-cases/
├── test/
├──── e2e/
├──── unit/
├──── utils/
├── .env
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── app/
│   ├── core/
│   ├──── configs/
│   ├──── constants/
│   ├──── helpers/
│   ├──── hooks/
│   ├──── types/
│   ├── ui/
│   ├──── components/
│   ├──── forms/
│   ├──── screens/
│   ├──── styles/
└── .env
└── package.json
```

## 💾 Instalações obrigatórias

- Docker engine: para rodar uma instância local do banco de dados enquanto desenvolve e a aplicação pronta.
- Postman ou Insomnia: para testar a API do backend
- MongoDB Compass: para ver os dados persistidos no banco

## 📌 Etapas sugeridas

1. Escolher tema e escrever breve descrição para o seu padrinho
2. Subir backend funcional com login e CRUD (testar com Postman)
3. Criar telas no frontend e conectar com a API
4. Refatorar, revisar e melhorar a experiência
5. Apresentar para o time

## 🧑‍🏫 Suporte

- Para criar o design recomendamos que utilize alguma IA
  - [Lovable](https://lovable.dev/)
  - [Stitch](https://stitch.withgoogle.com/)
- Dúvidas? Chama o teu padrinho(a) ou qualquer pessoa do time!
- Foco em aprendizado: erre à vontade, mas pergunte sempre.
- Lembre-se: código limpo, PR bem descrito e commits frequentes ajudam muito!
- Vamos revisar o seu PR linha a linha, foque **bastante** nos detalhes!!

Boa sorte e bem-vindo(a) ao time! 💙
