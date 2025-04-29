### Important Links

[System Architecture](#system-architecture)
[Database Architecture](#database-architecture)
[Scalable Architecture (Desired)](#scalable-architecture)
[Dev Flow (Desired)](#dev-flow)
[Frontend-1](#frontend-1)
[Frontend-2](#frontend-2)

## Prerquisites

- clone this repo
- npm/node
- docker
- docker compose

## Install & Start

1. Open/Run Docker
2. In the root

```shell
npm run docker:up
```

3. Open the link

```shell
http://localhost:3001
```

4. To manually send events to kafka -> backend -> frontend
    - While in docker exec environment of backend directory run the following command
```shell
npm run send:events
```
- NOTE: I have also added a custom scheduler to send events

5. To close containers run;
```shell
npm run docker:down
```

# Architectures

# System Architecture

![Alt text](./architecture/traffic-analysis-system-architecture.png?raw=true "Title")

# Database Architecture

![Alt text](./architecture/db-structure-1.png?raw=true "Title")

# Scalable Architecture

![Alt text](./architecture/Scalable-Architecture.png?raw=true "Title")

# Dev Flow

![Alt text](./architecture/Dev-Flow.png?raw=true "Title")

# Frontend 1

![Alt text](./architecture/frontend-1.png?raw=true "Title")

# Frontend 2

![Alt text](./architecture/frontend-2.png?raw=true "Title")
