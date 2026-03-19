import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../views/LoginPage"
import TasksPage from "../views/TasksPage"
import { HomePage } from "../views/HomePage"
// Aquí creamos el "mapa" de nuestras rutas
export const router = createBrowserRouter([
  {
    path: '/', // La ruta inicial (localhost:5173/)
    element: <HomePage />,
  },
  {
    path: '/login', // La ruta inicial (localhost:5173/)
    element: <LoginPage />,
  },
  {
    path: '/tareas', // (localhost:5173/tasks)
    element: <TasksPage />,
  },
  {
    path: '/RegisterPage', // Placeholder hasta crear RegisterPage
    element: <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}>
      <h2>Página de registro próximamente...</h2>
    </div>,
  },
])
