# Arquitetura do Sistema - Site para Nail Designer

## Visão Geral
O sistema será composto por um front-end web dinâmico, um back-end API robusto e um banco de dados relacional. A aplicação será inteiramente conteinerizada usando Docker para padronizar e facilitar o desenvolvimento local e a implantação (deploy) em produção.

## Componentes Principais

### 1. Front-end (Aplicação Cliente e Dashboard Admin)
*   **Tecnologia Sugerida:** Next.js (React), TypeScript, Tailwind CSS.
*   **Responsabilidade:** Entregar a interface gráfica. O lado cliente gerencia o fluxo de agendamento, portfólio e área do usuário. O lado administrador (Nail Designer) gerencia a agenda, confirmações, serviços e configurações do estabelecimento.
*   **Comunicação:** Consome a API REST/GraphQL do back-end.

### 2. Back-end (API)
*   **Tecnologia Sugerida:** Node.js com NestJS (ou Express para maior simplicidade), TypeScript, Prisma ORM.
*   **Responsabilidade:** Centralizar as regras de negócios, gerenciar o banco de dados, calcular estimativas de duração baseadas em serviços compostos, integrar com gateways de pagamento (Pix) e serviços de mensageria (WhatsApp/Email).

### 3. Banco de Dados
*   **Tecnologia Sugerida:** PostgreSQL.
*   **Responsabilidade:** Armazenamento persistente e estruturado para dados como Usuários, Serviços, Agendamentos, Pagamentos e Fichas de Anamnese.

### 4. Infraestrutura & Deploy
*   **Ambiente de Desenvolvimento:** Docker e Docker Compose organizam a comunicação entre Banco de Dados, Backend e Frontend de forma isolada do SO hospedeiro.
*   **Hospedagem (Produção):** Vercel (para o Front-end Next.js) e Render / Railway ou AWS (para o Back-end e Banco de Dados gerenciado).

## Fluxo de Autenticação e Segurança
*   Uso de JWT (JSON Web Tokens) para transações seguras.
*   Criptografia de senhas (ou *passwordless login* integrando com provedores externos / envio SMS).
*   Rotas e endpoints protegidos com RBAC (Role-Based Access Control) distinguindo entre `CLIENT` e `ADMIN`.
