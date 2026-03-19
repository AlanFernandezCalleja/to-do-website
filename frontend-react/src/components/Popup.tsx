interface PopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Popup = (
  {
    isOpen,
    title,
    message,
    type,
    onClose
  }: PopupProps


) => {
  if (!isOpen) return null

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        {/* El color del título cambia dependiendo de si es éxito o error */}
        <h3 className={`popup-title ${type === 'success' ? 'text-success' : 'text-error'}`}>
          {title}
        </h3>

        <p className="popup-message">{message}</p>

        {/* Reutilizamos tu botón azul minimalista */}
        <button className="btn-primary" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}
