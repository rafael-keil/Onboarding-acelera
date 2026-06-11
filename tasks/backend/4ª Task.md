# 🚪 TASK 4 – Criar rota de logout e invalidar token no Redis

## 📝 Descrição da funcionalidade

Para garantir segurança e controle de sessão, o sistema precisa permitir que o usuário **encerre sua sessão** explicitamente.  
A rota de logout deve:

- Ser autenticada (exigir token JWT válido).
- Remover o token da base do Redis.
- Confirmar o logout na resposta.

## 🎯 Objetivo

Implementar a rota `POST /logout` com os seguintes comportamentos:

- Validar o token JWT recebido no header `Authorization`.
- Localizar e remover o token do Redis.
- Retornar status de sucesso (`204 No Content` ou `200 OK`).

## 🛠️ Instruções técnicas

1. Criar a rota `POST /logout`.
2. Proteger a rota com **guard de autenticação**.
3. Obter o token JWT do header `Authorization`.
4. Montar a chave Redis usada na autenticação (`auth:{userId}:{token}`).
5. Remover essa chave do Redis (`redis.del`).
6. Retornar resposta de sucesso.

## ✅ Critérios de aceitação

- [ ] A rota `/logout` exige autenticação JWT válida
- [ ] O token é removido do Redis com base na chave do usuário + token
- [ ] A resposta retorna 204 ou 200 com sucesso
