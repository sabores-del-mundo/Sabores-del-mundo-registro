document.addEventListener("DOMContentLoaded", async () => {

    const nombre = document.getElementById("nombre");

    const matriculaPrueba = "126381237";

    try {

        const respuesta = await fetch(
            "https://script.google.com/macros/s/AKfycbwcQDGyo0rVFOd1Yt9fYQhwHMOpidgjKP2j67gNR3lbvyv-gCALKrhrxBgDTK214gn6_g/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    matricula: matriculaPrueba
                })
            }
        );

        const datos = await respuesta.json();
        console.log(datos);
        if (datos.encontrado) {
            nombre.textContent = datos.nombre;
        } else {
            nombre.textContent = "Participante no encontrado";
        }

    } catch (error) {
        console.error(error);
        nombre.textContent = "Error de conexión";
    }

});
