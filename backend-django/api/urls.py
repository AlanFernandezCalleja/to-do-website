from django.urls import path

from . import views

urlpatterns = [
    # Obtener la lista de usuarios
    path("usuarios/", views.obtener_usuarios, name="obtener_usuarios"),
    # Obtener Usuario por correo
    # Obtener Usuario por ID
    # Crear un usuario
    path("usuarios/crear/", views.crear_usuario, name="crear_usuario"),
    # Crear una nueva tarea
    path("tareas/crear/", views.crear_tarea, name="crear_tarea"),
    # Editar una tarea
    # Editar nombre Usuario
    # Editar contrasena de Usuario
    path("usuarios/editar/", views.editar_usuario, name="editar_usuario"),
    # Obtener tareas segun el usuario
    path("usuarios/<int:usuario_id>/tareas/", views.obtener_tareas_por_usuario , name="obtener_tareas_por_usuario"),
    #
    # ENDPOINT DE login:
    path("usuarios/login/", views.login_usuario, name="login_usuario"),
    
    
]
