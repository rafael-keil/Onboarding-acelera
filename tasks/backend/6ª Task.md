# ➕ TASK 6 – Criar rota `POST /nome_recurso` (criação de item)

## 📝 Descrição da funcionalidade

Com o schema/repository do recurso criado, agora você vai implementar a rota de **criação de novos itens** (ex: tarefas, receitas, etc.).

Essa rota deve ser **protegida com autenticação**: apenas usuários logados podem criar itens, e cada item deve ser associado ao `ownerId` do usuário.

## 🎯 Objetivo

- Criar a rota `POST /nome_recurso`
- Validar e salvar um novo item no banco de dados
- Associar o item ao usuário autenticado via `ownerId`
- Retornar o item criado na resposta

## 🛠️ Instruções técnicas

1. Criar um controller em `src/routes/<nome_recurso>/<nome_recurso>.controller.ts`
2. Criar um usecase para a criação do item
3. Usar o repository criado na task anterior para salvar no MongoDB
4. Usar o `userId` do `Request` (injetado pelo guard de autenticação) como `ownerId`
5. Adicionar validações básicas de campos obrigatórios
6. Proteger a rota com `@UseGuards(AuthGuard)`

## ✅ Critérios de aceitação

- [ ] A rota `POST /nome_recurso` está funcionando e autenticada
- [ ] O body contém os campos definidos no schema
- [ ] O item é salvo com o `ownerId` do usuário logado
- [ ] A resposta retorna status `201 Created` com o item salvo
