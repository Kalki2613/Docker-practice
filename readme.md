
# running

  docker compose -f mongo.yaml up -d


# stoping
  
 docker compose -f mongo.yaml down



You’re asking for **Docker `.yaml` (docker-compose.yml) commands** 👍
Below is a **clear cheat-sheet + a working example** for your **Node + Mongo + Mongo-Express** setup.

---

## ✅ What is `docker-compose.yml`?

* A **YAML file** to run **multiple containers together**
* Replaces long `docker run` commands
* Uses **one command** to start everything

---

## ✅ Basic Docker-Compose Commands (MOST IMPORTANT)

Run these in the folder where `docker-compose.yml` exists.

### 🔹 Start all services

```bash
docker compose up
```

### 🔹 Start in background (detached)

```bash
docker compose up -d
```

### 🔹 Stop services

```bash
docker compose down
```

### 🔹 Stop + remove volumes

```bash
docker compose down -v
```

### 🔹 Rebuild images

```bash
docker compose build
```

### 🔹 Rebuild & start

```bash
docker compose up --build
```

### 🔹 Check running containers

```bash
docker compose ps
```

### 🔹 View logs

```bash
docker compose logs
```

### 🔹 Logs of a specific service

```bash
docker compose logs mongo
docker compose logs nodeapp
```

---

## ✅ Working `docker-compose.yml` (Node + Mongo + Mongo-Express)

Create **`docker-compose.yml`** in your project folder:

```yaml
version: "3.9"

services:
  mongo:
    image: mongo
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root123

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: root123
      ME_CONFIG_MONGODB_SERVER: mongo
    depends_on:
      - mongo

  nodeapp:
    build: .
    container_name: nodeapp
    ports:
      - "3030:3030"
    environment:
      MONGO_URL: mongodb://root:root123@mongo:27017/admin
    depends_on:
      - mongo
```

---

## ✅ Your Mongo URL inside `server.js` (when using compose)

```js
const MONGO_URL = process.env.MONGO_URL;
```

📌 Docker Compose injects it automatically.

---

## 🌐 URLs after `docker compose up -d`

| Service       | URL                                            |
| ------------- | ---------------------------------------------- |
| Node App      | [http://localhost:3030](http://localhost:3030) |
| Mongo Express | [http://localhost:8081](http://localhost:8081) |
| MongoDB       | localhost:27017                                |

---

## 🎤 Viva One-Line Answer

> **Docker Compose uses a YAML file to define and run multiple containers with a single command like `docker compose up`.**

---

## 🧠 Remember This Table

| Task    | Command                     |
| ------- | --------------------------- |
| Start   | `docker compose up -d`      |
| Stop    | `docker compose down`       |
| Rebuild | `docker compose up --build` |
| Logs    | `docker compose logs`       |

---

If you want next:

* ✅ Explain **each YAML line**
* ✅ Common **YAML errors**
* ✅ Docker-Compose **viva Q&A**
* ✅ ENV switching (dev/prod)

Just tell me 👍
