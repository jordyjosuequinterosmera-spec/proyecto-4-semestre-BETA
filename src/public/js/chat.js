
// 1.
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');


// 2.
const respuestas = {
    bienvenida: `
        🌊 Bienvenido a <strong>Casa Barlovento</strong>, tu refugio frente al mar en Olón.
        <br><br>
        Estoy aquí para ayudarte como tu <em>concierge digital</em>.
    `,
    cotizar: `
        🏨 Nuestras habitaciones parten desde <strong>$85 por noche</strong>.
        <br><br>
        ✨ Reserva aquí mismo y asegura el mejor precio directo.
    `,
    horarios: `
        ⏰ <strong>Horarios en Casa Barlovento</strong><br><br>

        🏨 <strong>Check-in</strong><br>
        • Desde las <strong>14:00</strong><br>
        • Early check-in sujeto a disponibilidad<br><br>

        🧳 <strong>Check-out</strong><br>
        • Hasta las <strong>12:00</strong><br>
        • Late check-out bajo solicitud<br><br>

        ✨ ¿Viajas en un horario especial?<br>
        Escríbeme tu hora de llegada y te ayudo 😉
    `,
    ubicacion: `
        📍 Estamos en <strong>Olón, Santa Elena</strong>, frente al santuario.
        <br><br>
        <a href="https://maps.google.com/?q=Olón,Santa+Elena" target="_blank"
        style="color:#cfa85f; font-weight:bold;">
            🌊 Ver en Google Maps
        </a>
    `,
    default: `
        🌴 Puedes preguntarme sobre habitaciones, precios, experiencias o reservar.
    `
};


// 3. 

const experienciasHotel = [
    { id: "yoga", nombre: "🧘 Yoga Frente al Mar" },
    { id: "surf", nombre: "🏄 Clases de Surf" },
    { id: "hiking", nombre: "🌿 Caminatas Ecológicas" },
    { id: "events", nombre: "🎉 Eventos Privados" },
    { id: "massage", nombre: "💆 Masajes Terapéuticos" },
    { id: "gastronomy", nombre: "🌌 Cena Bajo las Estrellas" }
];


// 4

const normalizarTexto = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


// 5.
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const ctaBox = document.getElementById('cta-mini-box');

    chatContainer.classList.toggle('hidden');

    if (!chatContainer.classList.contains('hidden')) {
        if (ctaBox) ctaBox.style.display = 'none';
        if (chatMessages.children.length === 0) iniciarChat();
    } else {
        if (ctaBox) ctaBox.style.display = 'block';
    }
}


// 6. 
function agregarMensaje(texto, tipo) {
    const div = document.createElement('div');
    div.className = `mensaje ${tipo}`;
    div.innerHTML = `
        <div class="burbuja">
            <span class="emisor">
                ${tipo === 'bot-mensaje' ? '🤖 Asesor Barlovento' : '👤 Huésped'}
            </span>
            <p>${texto}</p>
        </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// 7. 
function mostrarOpciones() {
    let opciones = document.getElementById('opciones-chat');
    if (opciones) opciones.remove();

    opciones = document.createElement('div');
    opciones.id = 'opciones-chat';
    opciones.className = 'botones-quick-reply';
    opciones.innerHTML = `
        <button class="btn-reply" onclick="preguntaRapida('Cotizar')">💰 Cotizar</button>
        <button class="btn-reply" onclick="preguntaRapida('Habitaciones')">🛏️ Habitaciones</button>
        <button class="btn-reply" onclick="preguntaRapida('Experiencias')">🌅 Experiencias</button>
        <button class="btn-reply" onclick="preguntaRapida('Ubicación')">📍 Ubicación</button>
    `;
    chatMessages.appendChild(opciones);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function preguntaRapida(texto) {
    chatInput.value = texto;
    chatForm.dispatchEvent(new Event('submit'));
}


// 8.
function iniciarChat() {
    agregarMensaje(respuestas.bienvenida, 'bot-mensaje');
    mostrarOpciones();
}


// 9.
function mostrarHabitacionesBot() {
    agregarMensaje(
        "🛏️ Estas son nuestras habitaciones disponibles. Elige una para ver detalles:",
        'bot-mensaje'
    );

    const cont = document.createElement('div');
    cont.style.textAlign = "center";

    cont.innerHTML = `
        <button class="btn-reply" style="margin:6px" onclick="abrirHabitacionChat(1)">
            🌊 Vista al Mar
        </button>
        <button class="btn-reply" style="margin:6px" onclick="abrirHabitacionChat(2)">
            🌿 Jardín Interior
        </button>
        <button class="btn-reply" style="margin:6px" onclick="abrirHabitacionChat(3)">
            👨‍👩‍👧 Familiar
        </button>
        <button class="btn-reply" style="margin:6px" onclick="irAVistaHabitaciones()">
            🏨 Ver todas
        </button>
    `;

    chatMessages.appendChild(cont);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// 10.

function mostrarExperienciasBot() {
    agregarMensaje(
        "🌅 Estas son nuestras experiencias exclusivas:",
        'bot-mensaje'
    );

    experienciasHotel.forEach(exp => {
        const cont = document.createElement('div');
        cont.style.textAlign = "center";
        cont.innerHTML = `
            <button class="btn-reply" style="margin:6px"
                onclick="abrirExperienciaDesdeBot('${exp.id}')">
                ${exp.nombre}
            </button>
        `;
        chatMessages.appendChild(cont);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// 11
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const mensaje = chatInput.value.trim();
    if (!mensaje) return;

    agregarMensaje(mensaje, 'user-mensaje');
    chatInput.value = "";

    setTimeout(() => {
        const texto = normalizarTexto(mensaje);

        if (/cotizar|precio|reserva/.test(texto)) {
            agregarMensaje(respuestas.cotizar, 'bot-mensaje');
            ofrecerReservaDirecta();
        }
        else if (/habitacion/.test(texto)) {
            mostrarHabitacionesBot();
        }
        else if (/experiencia|actividad/.test(texto)) {
            mostrarExperienciasBot();
        }
        else if (/horario|check/.test(texto)) {
            agregarMensaje(respuestas.horarios, 'bot-mensaje');
        }
        else if (/ubicacion|donde/.test(texto)) {
            agregarMensaje(respuestas.ubicacion, 'bot-mensaje');
        }
        else {
            agregarMensaje(respuestas.default, 'bot-mensaje');
        }

        mostrarOpciones();
    }, 600);
});


// 12
function abrirHabitacionChat(id) {
    if (typeof window.abrirHabitacionDesdeChat === "function") {
        toggleChat();
        window.abrirHabitacionDesdeChat(id);
    } else {
        window.location.href = `habitaciones.html?hab=${id}`;
    }
}

function irAVistaHabitaciones() {
    window.location.href = "habitaciones.html";
}


// 13
function abrirExperienciaDesdeBot(tipo) {
    window.location.href = `experiencias.html?exp=${tipo}`;
}


// 14.

function ofrecerReservaDirecta() {
    const cont = document.createElement('div');
    cont.style.textAlign = "center";
    cont.innerHTML = `
        <button onclick="irACotizarDesdeChat()"
        style="background:linear-gradient(135deg,#cfa85f,#e6c87a);
        border:none; padding:12px 18px; border-radius:16px;
        font-weight:600; cursor:pointer; margin:10px 0;">
            🏖️ Reservar ahora
        </button>
    `;
    chatMessages.appendChild(cont);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function irACotizarDesdeChat() {
    window.location.href = "index.html#punto-reserva";
}


// 15

window.toggleChat = toggleChat;
window.preguntaRapida = preguntaRapida;
window.abrirHabitacionChat = abrirHabitacionChat;
window.abrirExperienciaDesdeBot = abrirExperienciaDesdeBot;
