# 🗄️ Como Acessar e Popular o Banco de Dados

Guia para inserir e gerenciar dados no PostgreSQL do projeto Nail Design. Existem **três formas** de fazer isso, da mais simples à mais avançada.

---

## Opção 1 — Prisma Studio (Interface Visual) ⭐ Recomendado

O Prisma Studio é uma interface web que permite visualizar e editar o banco sem escrever SQL.

### Como abrir

```bash
# Dentro da pasta do backend (fora do Docker):
cd ~/Nail_Design/backend
npx prisma studio
```

Acesse em: **`http://localhost:5555`**

Você verá uma tabela para cada model do schema: `User`, `Service`, `Appointment`, `PortfolioImage`, `Product`, `PromoCode`.

> **Dentro do container Docker**, use:
> ```bash
> docker exec -it nail_design_backend npx prisma studio --port 5555 --browser none
> ```
> Depois acesse `http://localhost:5555` normalmente.

---

## Opção 2 — API REST do NestJS (Endpoints já existentes)

A forma correta em produção é usar os endpoints da API. Com o backend rodando, use `curl` ou um cliente como [Insomnia](https://insomnia.rest/) / [Postman](https://www.postman.com/).

### Criar um Serviço

```bash
curl -X POST http://localhost:3000/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alongamento em Fibra de Vidro",
    "description": "Técnica de excelência com naturalidade e durabilidade.",
    "price": 250,
    "durationMins": 150
  }'
```

### Listar todos os Serviços

```bash
curl http://localhost:3000/services
```

### Criar um Usuário Admin

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@lahass.com",
    "password": "suasenha123",
    "role": "ADMIN"
  }'
```

---

## Opção 3 — SQL direto pelo terminal (`psql`)

Para operações avançadas ou consultas customizadas.

### Acessar o banco

```bash
docker exec -it nail_design_postgres psql -U root -d nail_design_db
```

### Exemplos de comandos SQL

```sql
-- Listar todas as tabelas
\dt

-- Ver todos os serviços
SELECT id, name, price, "durationMins", "isActive" FROM "Service";

-- Inserir um serviço manualmente
INSERT INTO "Service" (id, name, description, price, "durationMins", "isActive", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Esmaltação em Gel',
  'Cores intensas e brilho espelhado que duram até 21 dias.',
  80,
  45,
  true,
  NOW(),
  NOW()
);

-- Desativar um serviço
UPDATE "Service" SET "isActive" = false WHERE name = 'Esmaltação em Gel';

-- Listar agendamentos com nome do cliente e serviço
SELECT a.id, u.name AS cliente, s.name AS servico, a.status, a."startTime"
FROM "Appointment" a
JOIN "User" u ON a."userId" = u.id
JOIN "Service" s ON a."serviceId" = s.id;

-- Sair do psql
\q
```

---

## Modelos do Banco de Dados (Referência)

### `Service` — Serviços oferecidos

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Gerado automaticamente |
| `name` | String | Nome do serviço |
| `description` | String? | Descrição (opcional) |
| `price` | Float | Preço em reais |
| `durationMins` | Int | Duração base em minutos |
| `isActive` | Boolean | Se aparece no frontend (padrão: `true`) |

### `User` — Clientes e administradores

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | String | Nome completo |
| `email` | String | E-mail único |
| `phone` | String? | Telefone (opcional) |
| `passwordHash` | String | Senha criptografada |
| `role` | Enum | `CLIENT` ou `ADMIN` |

### `Appointment` — Agendamentos

| Campo | Tipo | Descrição |
|---|---|---|
| `userId` | UUID | Referência ao cliente |
| `serviceId` | UUID | Referência ao serviço |
| `status` | Enum | `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED` |
| `startTime` | DateTime | Início (UTC) |
| `endTime` | DateTime | Fim = início + duração + 15min buffer |
| `totalPrice` | Float | Preço total cobrado |

### `PortfolioImage` — Portfólio

| Campo | Tipo | Descrição |
|---|---|---|
| `title` | String | Título da imagem |
| `category` | String? | Categoria (opcional) |
| `url` | String | URL da imagem |

---

## Ordem recomendada para popular o banco pela primeira vez

```
1. Criar os Serviços  →  POST /services (ou Prisma Studio)
2. Criar o usuário Admin  →  POST /users com role: "ADMIN"
3. Adicionar imagens ao Portfólio  →  Inserir em PortfolioImage
4. Testar o frontend  →  Os serviços já aparecerão automaticamente
```
