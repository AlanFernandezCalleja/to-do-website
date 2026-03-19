from django.db import models

# Create your models here.ArithmeticError

class Usuario(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    correo = models.EmailField(max_length=150, unique=True)
    contrasena = models.CharField(max_length=255)

    objects = models.Manager()

    DoesNotExist = models.ObjectDoesNotExist

    class Meta:
        db_table = "usuarios"
        managed = False

    def __str__(self):  # pyright: ignore[]

        return f"{self.nombre}"

# Modelo para tabla de tareas

class Tarea(models.Model):
    titulo = models.CharField(max_length=150)
    detalles = models.TextField(blank=True, null=True)

    objects = models.Manager()

    fk_id_usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, db_column="fk_id_usuario"
    )

    class Meta:
        db_table = "tareas"
        managed = False

    def __str__(self):  # pyright: ignore[ OverflowError]
        return f"{self.titulo}"
