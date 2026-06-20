const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwcQDGyo0rVFOd1Yt9fYQhwHMOpidgjKP2j67gNR3lbvyv-gCALKrhrxBgDTK214gn6_g/exec";

let ultimoQR = "";
const nombre = document.getElementById("nombre");

async function registrar(matricula) {

    try {

        const respuesta = await fetch(URL_SCRIPT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                matricula: matricula
            })
        });

        const datos = await respuesta.json();

        if (!datos.encontrado) {
            nombre.textContent = "❌ Participante no encontrado";
            return;
        }

        if (datos.accion === "entrada") {

            nombre.textContent =
                "✅ " + datos.nombre + " - Entrada registrada";

        } else if (datos.accion === "salida") {

            nombre.textContent =
                "👋 " + datos.nombre + " - Salida registrada";

        } else {

            nombre.textContent =
                "⚠️ " + datos.nombre + " - Registro completado";

        }

    } catch (error) {

        console.error(error);

        nombre.textContent =
            "❌ Error de conexión";

    }
}

function iniciarQR() {

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },

        (textoQR) => {

            if (textoQR === ultimoQR) return;

            ultimoQR = textoQR;

            registrar(textoQR);

            setTimeout(() => {
                ultimoQR = "";
            }, 3000);
        }
    );
}

document.addEventListener("DOMContentLoaded", () => {

    nombre.textContent = "📷 Esperando escaneo...";

    iniciarQR();

});
