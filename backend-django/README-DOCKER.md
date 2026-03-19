# 🐳 Guía de Dockerización - To-Do Backend

Tu proyecto Django ha sido dockerizado exitosamente. Aquí te muestro cómo usarlo.

## Requisitos Previos

- **Docker Desktop** instalado y ejecutándose
  - [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (viene incluido con Docker Desktop en Windows)

## Archivos Creados

1. **Dockerfile** - Define cómo se construye la imagen Docker
2. **docker-compose.yml** - Orquesta los servicios (Backend + PostgreSQL)
3. **requirements.txt** - Lista de dependencias Python
4. **.dockerignore** - Archivos a excluir de la imagen

## Inicio Rápido

### 1. Construir y iniciar los contenedores

```bash
docker-compose up --build
```

Esto hará lo siguiente:
- Construye la imagen del backend
- Levanta un contenedor PostgreSQL
- Ejecuta las migraciones automáticamente
- Inicia el servidor en `http://localhost:8000`

### 2. Verificar que todo funciona

Abre tu navegador y accede a:
```
http://localhost:8000/api/schema/swagger-ui/
```

### 3. Comandos útiles

#### Detener los contenedores
```bash
docker-compose down
```

#### Ver logs en tiempo real
```bash
docker-compose logs -f web
docker-compose logs -f db
```

#### Acceder a la terminal del contenedor
```bash
docker-compose exec web bash
```

#### Ejecutar comandos Django dentro del contenedor
```bash
# Crear superusuario
docker-compose exec web python manage.py createsuperuser

# Ejecutar migraciones
docker-compose exec web python manage.py migrate

# Recopilar archivos estáticos
docker-compose exec web python manage.py collectstatic
```

#### Reconstruir después de cambios en requirements.txt
```bash
docker-compose up --build
```

## Variables de Entorno

El archivo `.env` se lee automáticamente. Variables clave:

```dotenv
DEBUG=True                                    # Modo debug
SECRET_KEY=tu_secret_key_aqui                # Clave secreta
ALLOWED_HOSTS=localhost,127.0.0.1            # Hosts permitidos

# Base de Datos
DB_NAME=nombre_tu_db                         # Nombre de la BD
DB_USER=usuario_db                           # Usuario PostgreSQL
DB_PASSWORD=tu_contraseña                    # Contraseña PostgreSQL
DB_HOST=localhost                            # En Docker: 'db'
DB_PORT=5432                                 # Puerto PostgreSQL
```

⚠️ **Nota**: En Docker, el host de la BD debe ser `db` (nombre del servicio), no `localhost`.

## Acceso a PostgreSQL desde tu máquina

La base de datos está disponible en:
```
Host: localhost
Puerto: 5432
Usuario: (desde DB_USER)
Contraseña: (desde DB_PASSWORD)
Base de datos: (desde DB_NAME)
```

Puedes conectarte con herramientas como:
- **pgAdmin**
- **DBeaver**
- **psql** (línea de comandos)

## Estructura del docker-compose.yml

```yaml
db:        # Servicio PostgreSQL
├─ puerto: 5432
├─ volumen: postgres_data (persiste datos)
└─ health check: verifica que esté listo

web:       # Servicio Django
├─ volumen: . (sincroniza código local)
├─ puerto: 8000
└─ depends_on: db (espera a que DB esté lista)
```

## Solución de Problemas

### Error: "Cannot assign requested address"
Usa `0.0.0.0` en lugar de `localhost` en ALLOWED_HOSTS

### Error: "Cannot connect to database"
- Verifica que `DB_HOST=db` en docker-compose.yml
- Comprueba que los servicios estén corriendo: `docker-compose ps`

### Error: "Port 8000 already in use"
Usa otro puerto:
```bash
docker-compose -f docker-compose.yml up -p 8001:8000
```

O detén el contenedor anterior:
```bash
docker-compose down
```

### Ver logs de errores
```bash
docker-compose logs web
```

## Desarrollo vs Producción

### Para Desarrollo (actual)
- `DEBUG=True` en `.env`
- Volumen sincroniza código en vivo
- Cambios en código se ven inmediatamente

### Para Producción
- Cambia `DEBUG=False`
- Usa un secret key fuerte en `SECRET_KEY`
- Configura `ALLOWED_HOSTS` con tu dominio
- Usa https y variables de entorno seguras
- Considera usar **Nginx** como reverse proxy

## Próximos Pasos Opcionales

1. **Agregar Nginx** como reverse proxy
2. **Usar Docker Hub** para compartir la imagen
3. **Configurar CI/CD** con GitHub Actions
4. **Nginx + Https** para producción

---

¡Tu proyecto está listo para dockerizarse! 🚀
