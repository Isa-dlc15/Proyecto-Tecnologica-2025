async function obtenerResumenWikipedia(consulta) {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(consulta)}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (datos.extract) {
            return `${datos.extract} <br><br> Fuente: <a href="${datos.content_urls.desktop.page}" target="_blank">Ver más en Wikipedia</a>`;
        } else {
            return "No encontré información sobre eso.";
        }
    } catch (error) {
        return "Hubo un error al obtener la información.";
    }
}

async function enviarMensaje() {
    const campoEntrada = document.getElementById("entrada-usuario");
    const cajaChat = document.getElementById("caja-chat");
    const mensajeUsuario = campoEntrada.value.trim();
    
    if (mensajeUsuario === "") return;
    
    cajaChat.innerHTML += `<p><strong>Tú:</strong> ${mensajeUsuario}</p>`;
    campoEntrada.value = "";
    
    setTimeout(async () => {
        let consulta = mensajeUsuario
            .replace("¿Qué significa ", "")
            .replace("¿Quién es ", "")
            .replace("¿Qué es ", "")
            .replace("?", "")
            .trim();
        let respuestaBot = await obtenerResumenWikipedia(consulta);
        cajaChat.innerHTML += `<p><strong>Chatbot:</strong> ${respuestaBot}</p>`;
        cajaChat.scrollTop = cajaChat.scrollHeight;
    }, 500);
}