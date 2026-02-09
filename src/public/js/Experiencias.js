// ============================================
// EXPERIENCIAS.JS - Casa Barlovento
// ============================================

const experienciasData = {
    yoga: {
        titulo: 'Yoga Frente al Mar',
        descripcion: 'Sesión de yoga al amanecer frente al océano con instructores certificados.',
        extra: 'Ideal para relajación, conexión interior y energía positiva.'
    },
    surf: {
        titulo: 'Clases de Surf',
        descripcion: 'Clases personalizadas para todos los niveles en la playa de Olón.',
        extra: 'Incluye tabla, instructor y acompañamiento en el agua.'
    },
    hiking: {
        titulo: 'Caminatas Ecológicas',
        descripcion: 'Explora senderos naturales con guías locales expertos.',
        extra: 'Observación de flora, fauna y paisajes únicos.'
    },
    events: {
        titulo: 'Eventos Privados',
        descripcion: 'Bodas, retiros y celebraciones personalizadas frente al mar.',
        extra: 'Planificación completa y atención exclusiva.'
    },
    massage: {
        titulo: 'Masajes Terapéuticos',
        descripcion: 'Tratamientos holísticos con aceites naturales y vista al océano.',
        extra: 'Relajación profunda cuerpo y mente.'
    },
    gastronomy: {
        titulo: 'Cena Bajo las Estrellas',
        descripcion: 'Cena romántica de 5 tiempos con chef privado.',
        extra: 'Experiencia gastronómica íntima frente al mar.'
    }
};


let modal = null;
let experienciaActual = '';


document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('modalExperiencia');

    
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            abrirModal(btn.dataset.action);
        });
    });

   
    const closeBtn = document.getElementById('btnCloseModal');
    if (closeBtn) closeBtn.onclick = cerrarModal;

    
    detectarExperienciaDesdeURL();
});


function abrirModal(tipo) {
    const exp = experienciasData[tipo];
    if (!exp) return;

    document.getElementById('modalTitle').innerText = exp.titulo;
    document.getElementById('modalDescription').innerText = exp.descripcion;

    const extra = document.getElementById('modalExtra');
    if (extra) {
        extra.innerText = exp.extra || '';
        extra.style.display = 'block';
    }

    experienciaActual = tipo;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}



function abrirExperienciaDesdeChat(tipo) {
    const vista = document.getElementById('vista-experiencias');
    if (vista) {
        vista.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        abrirModal(tipo);
    }, 600);
}

window.abrirExperienciaDesdeChat = abrirExperienciaDesdeChat;



function detectarExperienciaDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('exp');

    if (tipo && experienciasData[tipo]) {
        setTimeout(() => {
            abrirExperienciaDesdeChat(tipo);
        }, 500);
    }
}
