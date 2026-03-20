# 🚀 Como Subir o Projeto Nail Design (Local)

Guia para rodar o **Frontend (Next.js)** e o **Backend (NestJS + PostgreSQL)** juntos em ambiente de desenvolvimento.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|---|---|---|
| Node.js | 20+ | `node -v` |
| npm | 9+ | `npm -v` |
| Docker Desktop | qualquer | `docker -v` |
| Docker Compose | v2 (embutido) | `docker compose version` |

> **Nota:** Todos os comandos abaixo devem ser executados no terminal do WSL (Ubuntu), a partir da pasta raiz do projeto (`~/Nail_Design`).

---

## Estrutura do Projeto

```
Nail_Design/
├── backend/          # API NestJS + Prisma
│   ├── docker-compose.yml   # Sobe o PostgreSQL e o container Node do backend
│   ├── .env                 # DATABASE_URL e JWT_SECRET
│   └── src/
├── frontend/         # App Next.js
│   └── src/
└── .agents/
```

---

## Passo 1 — Subir o Backend com Docker

O `docker-compose.yml` do backend sobe **dois serviços**:
- `postgres` → banco de dados PostgreSQL 15
- `app` → container Node 20 montando o código do backend

### 1.1 Entre na pasta do backend e suba os containers

```bash
cd ~/Nail_Design/backend
docker compose up -d
```

Isso vai:
1. Baixar as imagens (na primeira vez)
2. Criar o banco `nail_design_db` automaticamente
3. Manter o container do backend rodando (com `tail -f /dev/null`)

### 1.2 Instale as dependências dentro do container

```bash
docker exec -it nail_design_backend npm install
```

### 1.3 Rode as migrations do Prisma

```bash
docker exec -it nail_design_backend npx prisma migrate deploy
```

> **Dica:** Para gerar o client do Prisma (se necessário):
> ```bash
> docker exec -it nail_design_backend npx prisma generate
> ```

### 1.4 Inicie a API NestJS dentro do container

```bash
docker exec -it nail_design_backend npm run start:dev
```

A API estará disponível em: **`http://localhost:3000`**

---

## Passo 2 — Subir o Frontend em modo Dev (fora do Docker)

O frontend roda diretamente na máquina host (sem Docker) durante o desenvolvimento.

### 2.1 Instale as dependências (apenas uma vez)

```bash
cd ~/Nail_Design/frontend
npm install
```

### 2.2 Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em: **`http://localhost:3001`** (ou `3000` se o backend não estiver rodando na mesma porta)

> **Atenção:** O NestJS ocupa a porta `3000` por padrão. Configure o Next.js para rodar em outra porta com:
> ```bash
> npm run dev -- -p 3001
> ```
> Ou adicione `"dev": "next dev -p 3001"` em `frontend/package.json`.

---

## Passo 3 — Verificar se tudo está funcionando

| Serviço | URL | Esperado |
|---|---|---|
| Frontend (Next.js) | `http://localhost:3001` | Página inicial do site |
| Backend (NestJS) | `http://localhost:3000` | `{"statusCode":404}` ou payload da rota raiz |
| PostgreSQL | `localhost:5432` | Acessível via DBeaver / psql |

### Testar o banco via `psql` no container:

```bash
docker exec -it nail_design_postgres psql -U root -d nail_design_db
```

---

## Resumo — Ordem de Inicialização

```
1. docker compose up -d              (dentro de backend/)
2. docker exec -it nail_design_backend npm run start:dev
3. cd ../frontend && npm run dev -- -p 3001
```

---

## ⚠️ A falta de um Dockerfile afeta o backend?

**Resposta curta: Não para desenvolvimento local. Sim para produção.**

### Análise da situação atual

O `docker-compose.yml` do backend usa a seguinte estratégia:

```yaml
app:
  image: node:20          # imagem genérica do Node
  volumes:
    - .:/app              # monta o código local no container
  command: tail -f /dev/null  # mantém o container vivo, sem iniciar a app
```

Isso significa que:

**Funciona para DEV** — Você monta o código local dentro do container e executa os comandos manualmente (`npm install`, `npm run start:dev`). O `Dockerfile` **não é necessário** nessa abordagem.

**Não funciona para PRODUÇÃO** — Sem um `Dockerfile`, não é possível:
- Fazer o build da imagem para deploy em servidores como Railway, Render ou AWS
- Publicar a imagem em um registry (Docker Hub, GCR, ECR)
- Garantir que o ambiente seja reproduzível e sem dependência do volume local

---

### Dockerfile recomendado para o backend

Quando for necessário, crie `backend/Dockerfile`:

```dockerfile
# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

E atualize o `docker-compose.yml` para usar o build:

```yaml
app:
  build: .           # usa o Dockerfile local em vez de image: node:20
  container_name: nail_design_backend
  ports:
    - "3000:3000"
  depends_on:
    - postgres
  environment:
    - DATABASE_URL=postgresql://root:rootpassword@postgres:5432/nail_design_db?schema=public
    - JWT_SECRET=nail_design_super_secret
```

---

## Variáveis de Ambiente Importantes

| Variável | Arquivo | Valor padrão |
|---|---|---|
| `DATABASE_URL` | `backend/.env` | `postgresql://root:rootpassword@localhost:5432/nail_design_db` |
| `JWT_SECRET` | `backend/.env` | `nail_design_super_secret` |

> **Atenção:** No container Docker, use `@postgres` no host da `DATABASE_URL` (nome do serviço), não `@localhost`.
