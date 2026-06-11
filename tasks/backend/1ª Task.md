# 🐞 TASK 1 – Corrigir bug no cadastro de usuários duplicados e senha exposta

## 📝 Descrição do problema

Atualmente, o endpoint de cadastro (`POST /auth/signup`) permite:

- Criar múltiplas contas com o **mesmo email**
- Salvar a **senha em texto plano**
- Aceitar emails inválidos e senhas fracas

Esse comportamento é inseguro e precisa ser corrigido. Queremos garantir **unicidade do email**, **criptografia da senha** e **validações básicas de segurança**.

## 🎯 Objetivo

Corrigir o endpoint `/auth/signup` para que ele:

- Verifique se o email já existe no banco
- Criptografe a senha antes de salvar
- Valide se o email tem formato válido
- Valide se a senha tem pelo menos **6 caracteres** e **1 número**
- Retorne mensagens claras de erro quando necessário

## 🛠️ Instruções técnicas

1. Localize o `usecase` responsável pelo cadastro
2. Antes de salvar o novo usuário:
   - Verifique se já existe um usuário com o mesmo email
   - Valide o formato do email (regex simples)
   - Valide a força da senha (mín. 6 caracteres e pelo menos 1 número)
3. Caso qualquer validação falhe:
   - Lance exceção apropriada com mensagens claras (ex: "Email inválido", "Senha fraca")
   - Retorne status `400 Bad Request` ou `409 Conflict` conforme o caso
4. Se estiver tudo certo:
   - Criptografe a senha com `bcrypt` antes de salvar no MongoDB
   - Utilize [essa doc](https://docs.nestjs.com/security/encryption-and-hashing) para entender como criptografar e lidar com hashing de senhas

## ✅ Critérios de aceitação

- [ ] Não é possível cadastrar um usuário com email já existente
- [ ] Senha aparece criptografada no banco de dados
- [ ] Validação de email é obrigatória
- [ ] Validação de senha com no mínimo 6 caracteres e ao menos 1 número
- [ ] Erros retornam mensagens claras com status HTTP apropriado
- [ ] Cadastro de usuário válido funciona normalmente
