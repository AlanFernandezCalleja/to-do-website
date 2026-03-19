const getTasks = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}/tareas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener las tareas");
    }
    return await response.json();
}

export default getTasks;