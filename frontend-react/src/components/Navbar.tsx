import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="navbar-logo">✓</span>
                <span className="navbar-title">DoIt</span>
            </div>
            <div className="navbar-actions">
                <Link to="/login" className="btn-nav btn-nav-outline">
                    Iniciar Sesión
                </Link>
                <Link to="/RegisterPage" className="btn-nav btn-nav-filled">
                    Registrarme
                </Link>
            </div>
        </nav>
    );
};
