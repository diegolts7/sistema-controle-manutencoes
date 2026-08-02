# sistema-controle-manutencoes

Um sistema para controle e gerenciamento de manutenções de equipamentos do IFPB.

## ✅ Requisitos

- Node.js >= 18.x
- Docker + Docker Compose
- PostgreSQL (via Docker, conforme abaixo)

---

## 🚀 Como rodar o projeto

### 1. Entre na pasta do server

```bash
cd server
```

Todos os comandos e o arquivo `.env` abaixo são referentes a essa pasta (`server/`), onde ficam o `package.json`, o `compose.yaml` e o Prisma.

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` dentro da pasta `server/` com as seguintes variáveis:

```env
# Conexão com o banco de dados (para Docker)
POSTGRES_HOST=database
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
POSTGRES_PORT=5432

# Chave para autenticação JWT
JWT_SECRET=sua_chave_secreta

# URL de conexão do Prisma com o PostgreSQL
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/postgres?schema=public"

# Porta do servidor
PORT=5000

# Credenciais do usuário coordenador criado pelo seed
EMAIL_USER_COORD=admin@ifpb.edu.br
SENHA_USER_COORD=uma_senha_com_pelo_menos_8_caracteres
```

> `EMAIL_USER_COORD` e `SENHA_USER_COORD` são obrigatórias para rodar o seed (passo 6) — é com elas que o usuário coordenador (admin) é criado e autenticado.

---

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

Isso sobe apenas o container do PostgreSQL (`database`), usado pela aplicação.

---

### 5. Rode as migrações

```bash
npm run migrate
```

### 5.1. Gere o client do Prisma

```bash
npm run generate
```

> O `npm run migrate` já gera o client automaticamente na maioria dos casos; rode `npm run generate` manualmente se o editor não reconhecer os tipos do Prisma ou depois de puxar alterações no `schema.prisma`.

---

### 6. Popule o banco com dados iniciais (seed)

```bash
npm run seed
```

Esse comando cria, na ordem de dependência (pulando o que já existir):

1. **Coordenador (admin)** — com `EMAIL_USER_COORD` / `SENHA_USER_COORD` do `.env`.
2. **Instituição de ensino** de exemplo ("IFPB - Campus Cajazeiras").
3. **Usuário professor** (`professor.seed@ifpb.edu.br`) e **usuário técnico** (`tecnico.seed@ifpb.edu.br`), ambos vinculados à instituição acima e usando a mesma senha do coordenador (`SENHA_USER_COORD`).
4. **Laboratório** de exemplo ("Laboratório de Redes"), tendo o professor criado como responsável.
5. **3 manutenções** de exemplo nesse laboratório, sempre com o professor como solicitante e o técnico como responsável:
   - Uma `SOLICITADA` / `CORRETIVA`, com prazo futuro;
   - Uma `SOLICITADA` / `PREVENTIVA`, com prazo já vencido (útil para testar manutenções em atraso);
   - Uma `CONCLUIDA` / `CORRETIVA`, já finalizada.

O seed é seguro para rodar mais de uma vez: cada etapa verifica se o registro já existe antes de criar.

---

### 7. Inicie o servidor

```bash
npm run start
```

O servidor sobe em `http://localhost:<PORT>` (o valor de `PORT` configurado no `.env`), com todas as rotas prefixadas em `/api`.

---

## 🔑 Autenticação e cargos

A autenticação é feita via JWT. Fluxo básico:

1. `POST /api/auth/login` com `email` e `senha` → retorna `access` e `refresh` tokens.
2. Envie o `access` token no header `Authorization: Bearer <token>` nas rotas protegidas.
3. Quando o `access` token expirar, use `POST /api/auth/atualizar-token` com o `refresh` token para obter um novo par de tokens.
4. `GET /api/auth/usuario-logado` retorna os dados de quem está autenticado.

Existem três cargos (`CargoEnum`), que controlam o acesso a determinadas rotas:

| Cargo         | Pode fazer                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `PROFESSOR`   | Solicitar, editar e cancelar as próprias manutenções                                                    |
| `TECNICO`     | Concluir manutenções atribuídas a ele e gerenciar imagens de manutenção                                 |
| `COORDENADOR` | Acesso administrativo completo: usuários, instituições, laboratórios, qualquer manutenção e o dashboard |

---

## 📦 Módulos da API

| Prefixo                   | Descrição                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/auth`               | Login, verificação/atualização de token e usuário logado                                                                                                                                               |
| `/api/instituicao-ensino` | CRUD de instituições de ensino (escrita restrita a `COORDENADOR`)                                                                                                                                      |
| `/api/user`               | CRUD de usuários (criação e edição restritas a `COORDENADOR`)                                                                                                                                          |
| `/api/laboratorios`       | CRUD de laboratórios (escrita restrita a `COORDENADOR`)                                                                                                                                                |
| `/api/manutencao`         | Solicitação, busca, edição, conclusão e cancelamento de manutenções (regras variam por cargo)                                                                                                          |
| `/api/imagem`             | Upload, busca, edição e remoção de imagens de manutenções (`COORDENADOR` ou `TECNICO`)                                                                                                                 |
| `/api/dashboard`          | Métricas quantitativas do sistema para o `COORDENADOR` monitorar (contadores gerais, manutenções por status/tipo, manutenções em atraso, carga por técnico, evolução mensal e ranking de laboratórios) |

---

## 🧪 Testes

_Em breve..._

---

## 📚 Documentação

Acesse a documentação da API via Swagger em:

```
http://localhost:<PORT>/api/docs
```

Substituindo `<PORT>` pelo valor configurado no `.env` (ex.: `http://localhost:5000/api/docs`).

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- Fastify
- Zod (validação de schemas)
- Prisma
- PostgreSQL
- Docker

---
