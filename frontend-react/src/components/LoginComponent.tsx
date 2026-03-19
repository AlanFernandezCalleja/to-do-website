
// Definimos todo lo que el padre le va a inyectar a este componente
interface LoginProps {
  correo: string;
  contrasena: string;
  onCorreoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContrasenaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const LoginComponent = ({
  correo,
  contrasena,
  onCorreoChange,
  onContrasenaChange,
  onSubmit
}: LoginProps) => {
  return (
    /* Cambiamos el div por un form y conectamos el onSubmit */
    <form className="login-card" onSubmit={onSubmit}>
      <h3 className="login-title">Iniciar Sesión</h3>

      <div className="form-group">
        <label htmlFor="correo" className="form-label">Ingresa tu cuenta:</label>
        <input
          type="email"
          id="correo"
          className="form-input"

          value={correo}
          onChange={onCorreoChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contraseña" className="form-label">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          className="form-input"
          value={contrasena}
          onChange={onContrasenaChange}
        />
      </div>

      {/* El botón ahora es de tipo submit */}
      <button type="submit" className="btn-primary">
        Continuar
      </button>
    </form>
  );
};
