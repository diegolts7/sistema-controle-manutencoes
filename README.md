# sistema-controle-manutencoes

Um sistema para controle e gerenciamento de manutenções de equipamentos do IFPB

## ✅ Requisitos

- Node.js >= 18.x
- Docker + Docker Compose
- PostgreSQL

---

## Entre na pasta do server

```bash
cd server
```

### 1. Instale as dependências

```bash
npm install
```

---

### 2. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

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
```

---

### 3. Suba os containers com Docker

```bash
docker compose up -d
```

---

### 4. Rode as migrações

```bash
npm run migrate
```

---

### 5. Gere o cliente Prisma

```bash
npm run generate
```

---

### 6. Inicie o servidor

```bash
npm run start
```

---

## 🧪 Testes

_Em breve..._

---

## 📚 Documentação

Acesse a documentação da API via Swagger em:

```
http://localhost:5000/api/docs
```

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Docker

---
