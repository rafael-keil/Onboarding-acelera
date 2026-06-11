# ✏️ TASK 8 – Criar rota `PUT /nome_recurso/:id` (edição de item)

## 📝 Descrição da funcionalidade

Permitir que o usuário atualize um item existente que ele possui.  
A rota deve validar que o item pertence ao usuário autenticado antes de permitir a atualização.

## 🎯 Objetivo

- Criar a rota `PUT /nome_recurso/:id`
- Validar autenticação e autorização (item pertence ao usuário)
- Atualizar os campos enviados no banco
- Retornar o item atualizado

## 🛠️ Instruções técnicas

1. Criar o endpoint `PUT /nome_recurso/:id` no controller
2. Proteger a rota com o guard de autenticação
3. Obter o `id` do item pela rota e o `userId` do token
4. Verificar se o item pertence ao usuário (busca com filtro `ownerId` e `_id`)
5. Se não existir ou pertencer a outro usuário, retornar erro 404 ou 403
6. Atualizar os campos permitidos (ex: título, descrição, status)
7. Retornar o documento atualizado na resposta

## ✅ Critérios de aceitação

- [ ] A rota `PUT /nome_recurso/:id` exige autenticação
- [ ] Somente o dono do item pode editar
- [ ] Se o item não existir ou for de outro usuário, retorna erro adequado
- [ ] Atualiza corretamente os campos permitidos
- [ ] Retorna status 200 e o item atualizado no corpo da resposta
