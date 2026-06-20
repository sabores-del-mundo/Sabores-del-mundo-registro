document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("buscar");
    const nombre = document.getElementById("nombre");
    const mensaje = document.getElementById("mensaje");
    const matricula = document.getElementById("matricula");

    boton.addEventListener("click", async () => {

        const valor = matricula.value.trim();

        if (!valor) {
            nombre.textContent = "Ingrese una matrícula";
            mensaje.textContent = "";
            return;
        }

        try {

            const respuesta = await fetch(
                "https://script.google.com/macros/s/AKfycbwcQDGyo0rVFOd1Yt9fYQhwHMOpidgjKP2j67gNR3lbvyv-gCALKrhrxBgDTK214gn6_g/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        matricula: valor
                    })
                }
            );

            const texto = await respuesta.text();
            const datos = JSON.parse(texto);

            if (!datos.encontrado) {
                nombre.textContent = "Participante no encontrado";
                mensaje.textContent = "";
                return;
            }

            nombre.textContent = datos.nombre;

            if (datos.accion === "entrada") {
                mensaje.textContent = "✅ Entrada registrada correctamente";

            } else if (datos.accion === "salida") {
                mensaje.textContent = "👋 Salida registrada correctamente";

            } else {
                mensaje.textContent = "⚠️ Registro completado";
            }

        } catch (error) {
            nombre.textContent = "Error de conexión";
            mensaje.textContent = "";
            console.error(error);
        }

    });

});
