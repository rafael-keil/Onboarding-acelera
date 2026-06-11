# 📄 TASK 7 – Criar rota `GET /nome_recurso` (listagem dos itens do usuário)

## 📝 Descrição da funcionalidade

Agora que os usuários podem criar itens no sistema, precisamos permitir que eles **visualizem seus próprios dados**.

A rota `GET /nome_recurso` deve retornar **apenas os itens associados ao usuário autenticado**, usando o `ownerId`.

## 🎯 Objetivo

- Criar a rota `GET /nome_recurso`
- Buscar os itens do banco de dados filtrando pelo `ownerId`
- Retornar todos os itens do usuário logado

## 🛠️ Instruções técnicas

1. Criar a rota no mesmo controller onde está o `POST /nome_recurso`
2. Aplicar o `AuthGuard` para proteger a rota
3. Obter o `userId` via `@Req()` e usar para filtrar os dados no MongoDB
4. Retornar os itens encontrados no formato JSON

## ✅ Critérios de aceitação

- [ ] A rota `GET /nome_recurso` está protegida com o guard de autenticação
- [ ] Apenas os itens do usuário logado são retornados
- [ ] A resposta contém status 200 e uma lista em JSON
- [ ] Se não houver itens, retornar lista vazia
