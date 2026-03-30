
interface footerData {
    correo: "alan.fernandez@ucb.edu.bo",



}

const footerInformacion = {
    correo: "alan.fernandez@ucb.edu.bo"
}
export const Footer =()=>{
    return (
        <section>
            <p>Este es el footer</p>
            <p> ${footerInformacion.correo}</p>
        </section>
    )
}