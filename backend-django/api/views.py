from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UsuarioSerializer, TareaSerializer
from .models import Usuario, Tarea
from django.contrib.auth.hashers import check_password, make_password

from django.db import IntegrityError
from .docs import login_schema, editar_usuario_schema, crear_tarea_schema


@api_view(["POST"])
def crear_usuario(request):

    s = UsuarioSerializer(data=request.data)

    if s.is_valid():
        s.save()

        return Response(s.data, status=status.HTTP_201_CREATED)

    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def obtener_usuarios(request):  # pyright: ignore[request]
    list_users = Usuario.objects.all()

    serial_get = UsuarioSerializer(list_users, many=True)

    return Response(serial_get.data, status=status.HTTP_200_OK)


@login_schema
@api_view(["POST"])
def login_usuario(request):
    correo_recibido = request.data.get("correo")
    contrasena_recibida = request.data.get("contrasena")

    if not correo_recibido or not contrasena_recibida:
        return Response(
            {"error": "Por favor, proporcionar correo y contrasena"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        usuario = Usuario.objects.get(correo=correo_recibido)

        if check_password(contrasena_recibida, usuario.contrasena):
            serializer_login = UsuarioSerializer(usuario)
            return Response(
                {"message": "Login exitoso", "usuario": serializer_login.data},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Credenciales no validas"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except Usuario.DoesNotExist:
        return Response(
            # Error si el usuario no existe.
            {"error": "Error usuario no existe "},
            status=status.HTTP_400_BAD_REQUEST,
        )


@crear_tarea_schema
@api_view(["POST"])
def crear_tarea(request):
    id_usuario_r = request.data.get("id_usuario")
    correo_r = request.data.get("correo")
    titulo_r = request.data.get("titulo")

    detalles_r = request.data.get("detalles", "")

    if not id_usuario_r or not correo_r or not titulo_r:
        return Response(
            {
                "error": "Error datos faltantes de correo o no has colocado un titulo para tu tarea"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        usuario = Usuario.objects.get(id=id_usuario_r, correo=correo_r)

        nueva_tarea = Tarea.objects.create(
            titulo=titulo_r, detalles=detalles_r, fk_id_usuario=usuario
        )

        return Response(
            {"titulo_tarea": nueva_tarea.titulo, "correo": usuario.correo},
            status=status.HTTP_201_CREATED,
        )

    except Usuario.DoesNotExist:
        return Response(
            {"error": "El usuario no existe o el correo no coincide con el id"},
            status=status.HTTP_404_NOT_FOUND,
        )


@editar_usuario_schema
@api_view(["PUT"])
def editar_usuario(request):
    id_usuario = request.data.get("id")
    nuevo_nombre = request.data.get("nombre")
    nueva_contra = request.data.get("contrasena")

    if not id_usuario:
        return Response(
            {"error": "El ID del usuario es necesario"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        usuario = Usuario.objects.get(id=id_usuario)
        if nuevo_nombre:
            usuario.nombre = nuevo_nombre

        if nueva_contra:
            usuario.contrasena = make_password(nueva_contra)

        usuario.save()

        usuario_serializado = UsuarioSerializer(usuario)
        return Response(
            {
                "Succesfuly": "Datos actualizados con exito! ",
                "usuario": usuario_serializado.data,
            },
            status=status.HTTP_202_ACCEPTED,
        )
    except Usuario.DoesNotExist:
        return Response(
            {"error": "No se encontro un usuario con ese ID"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except IntegrityError:
        return Response(
            {
                "error": "El nombre de ese usuario ya esta en uso por otra cuenta, elegir otro nombre"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

@api_view(['GET'])
def obtener_tareas_por_usuario(request, usuario_id):
    # id_user = request.data.get('id')

    # if not id_user:
    #     return Response({
    #         "error" : "No se recibio un id de usuario."
    #     })

    # list_tareas = Tarea.objects.all()
    try:
        usuario = Usuario.objects.get(id = usuario_id)
        
        list_tareas = Tarea.objects.filter(fk_id_usuario = usuario)
        
        serializar = TareaSerializer(list_tareas, many=True )
        
        return Response(serializar.data, status=status.HTTP_200_OK)
    
    except Usuario.DoesNotExist:
        return Response(
            {
                'error' : 'No se encontro el usuario'
            },
            status = status.HTTP_404_NOT_FOUND
        )
        
    


