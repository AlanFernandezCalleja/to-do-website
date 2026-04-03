# 🚀 To Do web app - Open Source

¡Bienvenido/a a **To do web app - Open Source**! Esta es una aplicación web full-stack creada con **React** en el frontend y **Django** en el backend, con una base de datos PostgreSQL. Todo el backend está containerizado para que sea fácil de levantar en cualquier computadora.
aplicacion
![Vista del Tablero](./assets/captura-juego.png)
## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema antes de empezar:
* [Docker y Docker Compose](https://docs.docker.com/get-docker/) (para el backend y la base de datos).
* [Bun](https://bun.sh/) (un entorno de ejecución ultra rápido para JavaScript/React).
* Git.

---

## ⚙️ Instalación y Configuración

Primero, clona este repositorio en tu máquina local:
```bash
git clone https://github.com/AlanFernandezCalleja/to-do-website.git
cd to-do-website
```

### 🐳 1. Iniciar el Backend (Django + PostgreSQL con Docker)

El backend utiliza Docker para levantar tanto el servidor de Django como la base de datos PostgreSQL de forma rápida y sin configuraciones complejas en tu sistema.

1. Navega a la carpeta del backend:
   ```bash
   cd backend-django
   ```
2. Configura tus variables de entorno copiando el archivo de ejemplo:

```Bash
cp .env.example .env
```

(Asegúrate de abrir el nuevo archivo .env y colocar las credenciales locales que prefieras para tu base de datos).

3. Construye y levanta los contenedores en segundo plano:

```Bash
docker compose up -d --build
```
4. Aplica las migraciones para crear las tablas en la base de datos:

```Bash
docker compose exec backend python manage.py migrate
```
¡Listo! El backend estará funcionando y recibiendo peticiones en http://localhost:8000.

### ⚡ 2. Iniciar el Frontend (React con Bun)
El frontend está construido con React (usando Vite) y utiliza bun como gestor de paquetes para una instalación y ejecución ultrarrápidas.

1. Abre una nueva terminal (sin cerrar la del backend) y navega a la carpeta del frontend:
```Bash
cd frontend-react
```
2. Instala todas las dependencias del proyecto:

```Bash
bun install
```
3. Configura tus variables de entorno para conectar con el backend:

```Bash
cp .env.example .env
```
4. Inicia el servidor de desarrollo:

```Bash
bun run dev
```
El frontend estará disponible en tu navegador apuntando a http://localhost:5173.
