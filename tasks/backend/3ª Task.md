# 🛡️ TASK 3 – Criar guard de autenticação com verificação no Redis

## 📝 Descrição da funcionalidade

O sistema precisa proteger todas as rotas privadas com um **guard de autenticação** que:

- Valide o token JWT
- Confirme que ele está presente e válido no Redis
- Injete os dados do usuário autenticado no `Request`

Esse guard será usado em todas as rotas privadas do sistema.

## 🎯 Objetivo

Criar um **guard global ou reutilizável** que:

- Intercepte requisições com JWT no header
- Decodifique o JWT (sem precisar consultar o banco)
- Verifique se o token existe no Redis
- Caso válido, injete os dados no `Request`
- Caso inválido, bloqueie a requisição com `401 Unauthorized`

## 🛠️ Instruções técnicas

1. Criar um guard usando o decorator `@Injectable()`.
2. Obter o token do header `Authorization` (formato: `Bearer <token>`).
3. Usar `JwtService` para validar o token e obter o `userId` (`sub`).
4. Verificar no Redis se o token ainda está válido:
5. Se estiver OK, permitir a requisição e armazenar `userId` e `token` em `request.user` e `request.token`.
6. Se não estiver, lançar `UnauthorizedException`.

## ✅ Critérios de aceitação

- [ ] Token JWT é validado corretamente
- [ ] Token deve existir no Redis para a requisição ser permitida
- [ ] Dados do usuário são adicionados ao `Request` (`req.user`, `req.token`)
- [ ] Requisições com token ausente, inválido ou expirado recebem `401 Unauthorized`
- [ ] O guard pode ser aplicado em qualquer rota com `@UseGuards(AuthGuard)`
