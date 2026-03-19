from drf_spectacular.utils import extend_schema, OpenApiExample
from .serializers import UsuarioSerializer

# Esquema para el Login
login_schema = extend_schema(
    summary="Inicio de sesión de usuario",
    description="Verifica las credenciales y devuelve los datos del usuario si son correctos.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "correo": {"type": "string", "example": "correo@ejemplo.com"},
                "contrasena": {"type": "string", "example": "password123"},
            },
            "required": ["correo", "contrasena"],
        }
    },
    responses={
        200: OpenApiExample(
            "Login Exitoso",
            value={
                "mensaje": "¡Login exitoso!",
                "usuario": {"id": 1, "nombre": "Mauri", "correo": "correo@ejemplo.com"},
            },
        ),
        401: OpenApiExample(
            "Error de Credenciales", value={"error": "Credenciales inválidas."}
        ),
    },
)

# Esquema para Editar Usuario
editar_usuario_schema = extend_schema(
    summary="Actualizar datos de usuario",
    description="Permite modificar el nombre y/o la contraseña de un usuario existente mediante su ID.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "id": {"type": "integer", "example": 1},
                "nombre": {"type": "string", "example": "Mauri Nuevo"},
                "contrasena": {"type": "string", "example": "nuevaContrasena456"},
            },
            "required": ["id"],
        }
    },
    responses={
        200: OpenApiExample(
            "Actualización Exitosa",
            value={
                "mensaje": "Datos actualizados.",
                "usuario": {
                    "id": 1,
                    "nombre": "Mauri Nuevo",
                    "correo": "mauri@ejemplo.com",
                },
            },
        ),
        400: OpenApiExample(
            "Error de Validación", value={"error": "Ese nombre ya está en uso."}
        ),
    },
)

# Esquema para Crear Tarea
crear_tarea_schema = extend_schema(
    summary="Asignar nueva tarea",
    description="Crea una tarea vinculada a un usuario validando su ID y correo.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "id_usuario": {"type": "integer", "example": 4},
                "correo": {"type": "string", "example": "luismora@gmail.com"},
                "titulo": {"type": "string", "example": "Tarea de limpiar basura"},
                "detalle": {
                    "type": "string",
                    "example": "Limpiar la basura de la casa",
                },
            },
        }
    },
    responses={
        200: {},
        404: OpenApiExample(
            "Error de usuario inexistente",
            value={"error": "El usuario no existe o el correo no coincide con el id"},
        ),
        400: OpenApiExample(
            "Formulario incompleto",
            value={
                "error": "Error de datos faltantes de correo o no has colocado untitulo para tu tarea.",
            },
        ),
    },
    # Aquí podemos ser más breves si ya lo definimos antes
)
