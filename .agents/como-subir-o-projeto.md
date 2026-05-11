# 🚀 Como Subir o Projeto Nail Design (Local)

Este guia explica como rodar o **Frontend (Next.js)** e o novo **Backend (Django + PostgreSQL)**.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|---|---|---|
| Node.js | 20+ | `node -v` |
| Python | 3.10+ | `python3 --version` |
| Docker Desktop | qualquer | `docker -v` |

---

## Passo 1 — Subir o Backend e Banco de Dados (Docker)

Agora, tanto o banco de dados quanto o backend Django e o painel de controle (Adminer) rodam via Docker Compose.

```bash
cd ~/Nail_Design/backend
docker compose up -d --build
```

Isso vai subir:
- **`db` (PostgreSQL)** na porta `5432`
- **`web` (Django)** na porta `8000`
- **`adminer` (Painel de Controle)** na porta `8080`

---

## Passo 2 — Configuração do Django (via Docker)

Como o Django está rodando no container, você deve executar as migrations e criar o superusuário através do `docker exec`.

### 2.1 Rode as Migrations

```bash
docker exec -it nail_design_backend python manage.py migrate
```

### 2.2 Crie um Superusuário (para o Admin do Django)

```bash
docker exec -it nail_design_backend python manage.py createsuperuser
```

---

## Passo 3 — Acessando os Serviços

| Serviço | URL | Descrição |
|---|---|---|
| API Principal | `http://localhost:8000/api/` | Endpoints da API |
| Django Admin | `http://localhost:8000/admin/` | Painel administrativo nativo do Django |
| Adminer | `http://localhost:8080` | Painel de controle do Banco de Dados (PostgreSQL) |
| Frontend | `http://localhost:3001` | Interface Next.js |

---

## Passo 4 — Subir o Frontend (Next.js)

O frontend permanece em Next.js e deve apontar para a nova URL da API (`http://localhost:8000/api/`).

### 3.1 Instale Dependências (se ainda não o fez)

```bash
cd ~/Nail_Design/frontend
npm install
```

### 3.2 Inicie o Frontend

```bash
npm run dev -- -p 3001
```

O frontend estará disponível em: **`http://localhost:3001`**

---

## Resumo — Comandos Rápidos

```bash
# Terminal 1 - Banco
cd ~/Nail_Design/backend && docker compose up -d

# Terminal 2 - Backend
cd ~/Nail_Design/backend && source .venv/bin/activate && python manage.py runserver

# Terminal 3 - Frontend
cd ~/Nail_Design/frontend && npm run dev -- -p 3001
```

---

## 🔑 Autenticação (JWT)

A API utiliza JWT. Os endpoints de token são:
- Obter Token: `POST /api/token/`
- Atualizar Token: `POST /api/token/refresh/`

---

## Variáveis de Ambiente (Opcional)

O Django está configurado para ler estas variáveis (ou usar padrões):
- `DB_NAME`: `nail_design_db`
- `DB_USER`: `root`
- `DB_PASSWORD`: `rootpassword`
- `DB_HOST`: `localhost`
- `DB_PORT`: `5432`
