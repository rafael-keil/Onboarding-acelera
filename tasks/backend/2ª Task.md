# 🔐 TASK 2 – Implementar login com JWT e salvar no Redis

## 📝 Descrição da funcionalidade

O sistema precisa permitir que usuários se autentiquem por email e senha.  
Ao fazer login, o sistema deve:

- Verificar as credenciais informadas.
- Gerar um **JWT válido**.
- Salvar esse token no **Redis** com tempo de expiração.
- Retornar o token no corpo da resposta.

## 🎯 Objetivo

Implementar a rota `POST /auth/login` com os seguintes comportamentos:

- Validar se o email existe e a senha está correta.
- Gerar um JWT com dados do usuário autenticado.
- Salvar o token no Redis com uma chave única (ex: `auth:{userId}:{token}`).
- Definir um tempo de expiração (ex: 1h).
- Retornar o token no corpo da resposta.

## 🛠️ Instruções técnicas

1. Criar a rota e usecase responsável pelo login.
2. Utilize `bcrypt.compare` para validar a senha informada com a do banco.
3. Use `@nestjs/jwt` para gerar o token.
4. Leia [essa doc](https://docs.nestjs.com/security/encryption-and-hashing) para entender como lidar com JWTs no NestJS. Ignore a parte que cita Passport.
5. Salve o token no Redis com TTL.
6. Envie o token no retorno da rota.

## ✅ Critérios de aceitação

- [ ] A rota `/login` autentica usuários com email e senha corretos
- [ ] Senha incorreta retorna erro 401 com mensagem clara
- [ ] Token JWT é gerado corretamente e inclui o `userId` no payload
- [ ] Token é salvo no Redis com TTL (ex: 1h)
- [ ] A resposta retorna o token
