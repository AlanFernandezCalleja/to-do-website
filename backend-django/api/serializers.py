from django.db.models import fields
from rest_framework import serializers
from .models import Usuario, Tarea
from django.contrib.auth.hashers import make_password


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "correo", "contrasena"]
        # Colocar un extra_kwargs, para evitar mostrar la contrasena en la respuesta 200
        extra_kwargs = {"contrasena": {"write_only": True}}

    def create(self, validated_data):

        password_plano = validated_data.pop("contrasena")

        password_cifrada = make_password(password_plano)

        # crear y guardar ul suuario

        usuario = Usuario.objects.create(contrasena=password_cifrada, **validated_data)

        return usuario


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ["id", "titulo", "detalles"]
