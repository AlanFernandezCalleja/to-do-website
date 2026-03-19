import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      <main className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">Organiza tu día ✓</span>
          <h1 className="home-headline">
            Tu lista de tareas,<br />
            <span className="home-headline-accent">simple y efectiva.</span>
          </h1>
          <p className="home-subtext">
            Crea, gestiona y completa tus tareas diarias en un solo lugar.
            Sin complicaciones, solo resultados.
          </p>
          <div className="home-cta-group">
            <Link to="/RegisterPage" className="btn-cta btn-cta-primary">
              Comenzar gratis
            </Link>
            <Link to="/login" className="btn-cta btn-cta-secondary">
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <div className="home-illustration">
          <div className="task-card-demo">
            <div className="task-demo-header">
              <span className="task-demo-dot green" />
              <span className="task-demo-dot yellow" />
              <span className="task-demo-dot red" />
            </div>
            <ul className="task-demo-list">
              <li className="task-demo-item done">
                <span className="task-check">✓</span> Diseñar la interfaz
              </li>
              <li className="task-demo-item done">
                <span className="task-check">✓</span> Conectar la API
              </li>
              <li className="task-demo-item">
                <span className="task-check empty" /> Agregar más funciones
              </li>
              <li className="task-demo-item">
                <span className="task-check empty" /> Compartir con el equipo
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};


