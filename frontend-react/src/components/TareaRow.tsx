
const TareaRow = (
    { titulo, detalles }:
        { titulo: string; detalles: string }) => {
    return (
        <>
            {/* Quiero que cada tarea contenga una imagen, su titulo, y sus detalles */}
            <div className="tarea-card">
                <h3>{titulo}</h3>
                <p>{detalles}</p>
            </div>
        </>
    );
}
export default TareaRow;