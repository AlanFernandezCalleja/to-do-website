import { useEffect, useState } from "react";
import getTasks from "../utils/TasksFetch";

interface Task {
    id: number;
    titulo: string;
    detalles: string;
}

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userId = Number(localStorage.getItem("userId"));

        if (!userId) {
            setError("No se encontró una sesión activa. Por favor inicia sesión.");
            setLoading(false);
            return;
        }

        getTasks(userId)
            .then((data: Task[]) => {
                setTasks(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="tasks-page">
            <header className="tasks-header">
                <h1 className="tasks-title">Mis Tareas</h1>
                <span className="tasks-count">{tasks.length} tarea{tasks.length !== 1 ? "s" : ""}</span>
            </header>

            {loading && (
                <div className="tasks-state">
                    <span className="tasks-spinner" />
                    <p>Cargando tareas...</p>
                </div>
            )}

            {error && (
                <div className="tasks-state tasks-state--error">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {!loading && !error && tasks.length === 0 && (
                <div className="tasks-state">
                    <p>No tienes tareas por el momento. ¡Es un buen momento para agregar una!</p>
                </div>
            )}

            {!loading && !error && tasks.length > 0 && (
                <ul className="tasks-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-card">
                            <span className="task-card-id">#{task.id}</span>
                            <div className="task-card-body">
                                <h2 className="task-card-title">{task.titulo}</h2>
                                {task.detalles ? (
                                    <p className="task-card-detail">{task.detalles}</p>
                                ) : (
                                    <p className="task-card-detail task-card-detail--empty">Sin descripción</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TasksPage;
