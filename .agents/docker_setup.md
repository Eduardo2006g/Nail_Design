# Configuração do Ambiente Docker

Este documento descreve as diretrizes para a conteinerização (Docker) da aplicação de Nail Designer, focando na padronização ambiente de desenvolvimento local.

## Estrutura do Docker Compose
O sistema utilizará um único arquivo `docker-compose.yml` localizado na raiz do projeto (ou pasta de infraestrutura) para subir, simultaneamente, todos os serviços necessários:

### 1. Serviço de Banco de Dados (`db`)
*   **Imagem Base:** `postgres:15-alpine`
*   **Volume:** Criação de um `named volume` (ex: `postgres_data:/var/lib/postgresql/data`) para manter viabilidade dos dados independentemente de o container reiniciar ou ser deletado.
*   **Rede:** Acessível somente pela rede interna do docker criada para a aplicação, comunicando-se na porta interna 5432.

### 2. Serviço de Back-end (API) (`api`)
*   **Dockerfile:** Precisa ser construído a partir de uma imagem `node:20-alpine`, utilizando multi-stage build para otimização quando migrar para produção.
*   **Volumes de Desenvolvimento:** Sincronização em tempo real (bind mount) dos arquivos `.ts` originais com o container, utilizando hot-reload (`npm run dev` / `ts-node-dev`).
*   **Dependência:** Deve inicializar sempre **após** a saúde do `db` (banco de dados) estar garantida (`depends_on`).  

### 3. Serviço de Front-end (`web`)
*   **Dockerfile:** Semelhante à API, utiliza uma variação `node:alpine`.
*   **Volumes de Desenvolvimento:** Sincronização do diretório de páginas/componentes para o Next.js aplicar HMR (Hot Module Replacement) instantaneamente.
*   **Portas Externas:** Exposto preferencialmente na porta `3000` para fácil acesso no browser host.

## Variáveis de Ambiente
* O orquestrador Docker deverá possuir suporte a um arquivo `.env` para gerenciar informações sensíveis localmente, espelhando `DATABASE_URL`, `JWT_SECRET`, e mock tags (chaves inativas) para gateways externos.

## Workflows Úteis
*   `docker compose up --build`: Comando primordial para a primeira instalação e visualização.
*   Para rodar *migrations* do banco de dados (ex: `npx prisma migrate dev`), será executado o comando dentro do container já logado no terminal do serviço `api`.
