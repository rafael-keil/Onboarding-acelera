# 🚀 TASK 10 – Configurar CI/CD com validações de qualidade e testes automatizados

## 📝 Descrição do problema

Nosso projeto NestJS precisa garantir qualidade de código e confiança nos testes a cada novo commit. Queremos configurar uma pipeline de CI no GitHub Actions para validar o código automaticamente sempre que houver uma mudança (push ou pull request).

Essa pipeline deve verificar se o código está limpo (lint), se os testes unitários(apenas das use-case) e e2e passam com sucesso e se o coverage total é de 100%.

## 🎯 Objetivo

Criar um workflow de CI no GitHub Actions que:

- Execute o lint do projeto (`npm run lin`)
- Execute o typescript check (`npm run typescript:check`)
- Execute o comando de formatação (`npm run format:check`)
- Execute os testes unitários (`npm run test:unit`)
- Execute os testes e2e (`npm run test:e2e`)

- Valide que o coverage total (statements, branches, functions, lines) é 100%
- Rode a cada `commit` ou `pull request` para a branch main

## 🛠️ Instruções técnicas

Crie um arquivo de workflow em `.github/workflows/ci.yml`

Use a imagem do **Node >=20.10.0** no ambiente da action

Instale as dependências com npm ci

Execute o lint com `npm run lint`

Execute os testes unitários com `npm run test -- --coverage`

Execute os testes e2e com `npm run test:e2e`

Configure para que a execução falhe se a cobertura for menor que 100%:

Pode configurar isso no `jest.config.ts` com a opção coverageThreshold

## ✅ Critérios de aceitação

- [ ] O workflow é executado automaticamente a cada commit ou PR na main
- [ ] O lint falha se houver erros de estilo ou padrão de código
- [ ] Os testes unitários e e2e são executados corretamente
- [ ] O projeto deve possui 100% de cobertura
- [ ] O jest.config.ts está configurado com coverageThreshold igual a 100% em todas as métricas
- [ ] Caso algum passo falhe, a action deve quebrar, impedindo o merge automático

## 📚 Dicas

Você pode consultar a documentação oficial do GitHub Actions

Se quiser ir além, explore também cache de dependências (actions/cache) e execução paralela de jobs
