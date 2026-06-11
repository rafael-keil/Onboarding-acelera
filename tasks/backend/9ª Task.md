# ❌ TASK 9 – Criar rota `DELETE /nome_recurso/:id` (remoção de item)

## 📝 Descrição da funcionalidade

Permitir que o usuário exclua um item que ele possui.  
A rota deve validar que o item pertence ao usuário autenticado antes de permitir a exclusão.

## 🎯 Objetivo

- Criar a rota `DELETE /nome_recurso/:id`
- Validar autenticação e autorização (item pertence ao usuário)
- Remover o item do banco de dados
- Retornar confirmação da exclusão

## 🛠️ Instruções técnicas

1. Criar o endpoint `DELETE /nome_recurso/:id` no controller
2. Proteger a rota com o guard de autenticação
3. Obter o `id` do item pela rota e o `userId` do token
4. Verificar se o item pertence ao usuário (busca com filtro `ownerId` e `_id`)
5. Se não existir ou pertencer a outro usuário, retornar erro 404 ou 403
6. Remover o item do banco de dados
7. Retornar status 204 (No Content) ou 200 com mensagem de sucesso

## ✅ Critérios de aceitação

- [ ] A rota `DELETE /nome_recurso/:id` exige autenticação
- [ ] Somente o dono do item pode excluir
- [ ] Se o item não existir ou for de outro usuário, retorna erro adequado
- [ ] O item é removido do banco corretamente
- [ ] Retorna status 204 ou 200 após exclusão
