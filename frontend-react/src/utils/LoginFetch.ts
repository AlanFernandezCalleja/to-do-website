
export const loginUser = async (
    correo_req: string,
    contrasena_req: string
) => {
    // Hacemos la petición
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            correo: correo_req,
            contrasena: contrasena_req
        })
    });

    // Si la respuesta de Django NO es un éxito (ej. 400 o 401)
    if (!response.ok) {
        // Extraemos el mensaje de error de Django si existe
        const errorData = await response.json().catch(() => ({}));
        // Lanzamos un error para que el 'catch' de LoginPage lo maneje
        throw new Error(errorData.detail || "Error en credenciales");
    }

    // Si todo salió bien, retornamos los datos (como el token)
    return await response.json();
}