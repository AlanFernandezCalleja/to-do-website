# Usa la imagen base oficial de Python
FROM python:3.12-slim

# Establece la variable de entorno para que Python no genere archivos .pyc
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copia el archivo requirements.txt e instala las dependencias de Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del proyecto al contenedor
COPY . /app/

# Recoge archivos estáticos (si los hay)
RUN python manage.py collectstatic --noinput || true

# Expone el puerto 8000
EXPOSE 8000

# Comando por defecto para ejecutar la aplicación
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
