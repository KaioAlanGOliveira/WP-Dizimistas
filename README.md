# WP-Dizimistas

Sistema web para gerenciamento de fiéis e pagamentos de dízimos, desenvolvido com Angular no frontend e Java no backend.

## Tecnologias

- **Frontend:** Angular, TypeScript, PrimeNG e RxJS.
- **Backend:** Java, JAX-RS, JPA e Maven.
- **Servidor:** WildFly.
- **Banco de dados:** MySQL.

## Estrutura do projeto

```text
WP-Dizimistas/
├── dizimistasng/   # Aplicação frontend Angular
└── dizimistassrv/  # API REST Java
```

## Funcionalidades

- Gerenciamento de fiéis.
- Cadastro e consulta de pagamentos.
- Comunicação entre frontend e backend por API REST.
- Persistência de dados em banco de dados MySQL.

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/KaioAlanGOliveira/WP-Dizimistas.git
cd WP-Dizimistas
```

### 2. Executar o backend

Entre na pasta do backend:

```bash
cd dizimistassrv
mvn clean package
```

Implante o arquivo WAR gerado no WildFly e configure o datasource MySQL conforme as configurações do projeto.

### 3. Executar o frontend

Entre na pasta do frontend:

```bash
cd dizimistasng
npm install
npm start
```

Se necessário, configure a URL da API no frontend para apontar para o backend em execução.

## Autor

**Kaio Alan Gonçalves Oliveira**

- GitHub: https://github.com/KaioAlanGOliveira
- Repositório: https://github.com/KaioAlanGOliveira/WP-Dizimistas
