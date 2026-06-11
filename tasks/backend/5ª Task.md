# 🧾 TASK 5 – Criar schema e repository do recurso principal

## 📝 Descrição da funcionalidade

Agora que a autenticação já está pronta, chegou o momento de iniciar o CRUD do recurso principal do sistema.

Você pode escolher o tema do seu projeto (Tarefas, Receitas, Filmes, etc.).  
O primeiro passo é **definir e criar o schema (modelo)** no MongoDB com Mongoose.

## 🎯 Objetivo

- Escolher o tema do projeto (se ainda não escolheu)
- Criar o schema do recurso principal usando `@Schema` do Mongoose
- Os campos devem ser coerentes com o tema escolhido
- Incluir o campo `ownerId` (referência ao usuário dono do item)
- Criar o repository e utilizar o schema criado como a model a ser usada no repository
- Registrar o repository como `@Injectable()` e disponibilizá-lo via provider

## 🛠️ Instruções técnicas

1. Crie um novo arquivo dentro de `src/core/repositories/nome_recurso/schemas/`
   - Ex: `task.schema.ts` ou `recipe.schema.ts`
2. Use os decorators `@Schema()` e `@Prop()` para definir os campos
3. Adicione o campo `ownerId` (tipo: `Types.ObjectId`, `ref: 'User'`)
4. Se quiser, adicione validações simples (`required`, `enum`, etc.)
5. Crie um novo arquivo dentro de `src/core/repositories/nome_recurso/`
   - Ex: `task.repository.ts` ou `recipe.repository.ts`
6. Exporte o repository como provider no módulo correspondente (`@Module`)

## ✅ Critérios de aceitação

- [ ] Schema criado com os campos principais do recurso
- [ ] Campo `ownerId` presente e referenciando o usuário dono
- [ ] Repository registrado no módulo como provider
- [ ] Código limpo, com nome de arquivo e exportação padronizados

## 💡 Exemplo de campos (caso o tema seja "tarefas")

```ts
@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  ownerId: Types.ObjectId;
}
```
