import { useState } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { loginUser } from "../utils/LoginFetch";

import { useNavigate } from "react-router-dom";
import { Popup } from "../components/Popup";


const LoginPage = () => {

    const [correo, setCorreo] = useState(''); // es String
    const [contrasena, setContrasena] = useState(''); // Tambien es string

    // Estados para controlar la ventana emergente:
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTittle] = useState('');
    const [popupMensaje, setPopupMensaje] = useState('');
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');

    const navigate = useNavigate();



    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginUser(correo, contrasena);

            // Guardamos el token y el id del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', String(data.usuario.id));

            setPopupTittle('Bienvenido!');
            setPopupMensaje('Has iniciado tu sesion correctamente.');
            setPopupType('success');
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setPopupTittle("Error de Acceso");
            setPopupMensaje(error instanceof Error ? error.message : "Correo o contraseña incorrectos");
            setPopupType("error");
            setIsPopupOpen(true);
        }
    }

    // Funcion para cerrar el popup
    const cerrarPopup = () => {
        setIsPopupOpen(false);
        if (popupType == 'success') {
            navigate('/tareas');
        }
    }

    return (
        <>
            <LoginComponent
                correo={correo}
                contrasena={contrasena}
                onCorreoChange={(e) => setCorreo(e.target.value)}
                onContrasenaChange={(e) => setContrasena(e.target.value)}
                onSubmit={handleLoginSubmit}
            />


            {/* renderizado de popup */}
            <Popup
                isOpen={isPopupOpen}
                message={popupMensaje}
                title={popupTitle}
                type={popupType}
                onClose={cerrarPopup}
            />
        </>
    )
}

export default LoginPage;