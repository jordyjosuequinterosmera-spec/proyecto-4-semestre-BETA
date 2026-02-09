document.addEventListener('DOMContentLoaded', () => {
    
    const contenedorEventos = document.getElementById('eventos-container');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const formReserva = document.getElementById('reserva-form');
    

    const modalImg = document.getElementById('modal-image');
    const modalTitleSide = document.getElementById('modal-title-side');
    const modalEventName = document.getElementById('modal-event-name');
    const hiddenInputId = document.getElementById('evento-id');


    const eventosDummy = [
        {
            uuid: '1',
            titulo: "Bodas en la Playa",
            descripcion: "Di 'sí, acepto' con el atardecer de fondo. Paquetes completos.",
            precio: 1500,
            capacidad: "50 - 200 pax",
            imagenUrl: "img/boda.jpg"
        },
        {
            uuid: '2',
            titulo: "Retiros de Yoga",
            descripcion: "Conecta cuerpo y mente frente al mar. Ideal para grupos de bienestar.",
            precio: 800,
            capacidad: "10 - 40 pax",
            imagenUrl: "img/yoga.jpg"
        },
        {
            uuid: '3',
            titulo: "Eventos Corporativos",
            descripcion: "Lanzamientos y team building con la mejor vista. Proyector incluido.",
            precio: 1200,
            capacidad: "20 - 100 pax",
            imagenUrl: "img/corporativo.jpg"
        }
    ];

    let eventosActuales = [];


    async function cargarEventos() {
        try {
        
            const response = await fetch('/api/eventos');
            if (!response.ok) throw new Error('Error al conectar con API');
            
            const data = await response.json();
            eventosActuales = data.eventos || [];
            
            if(eventosActuales.length === 0) throw new Error('Sin eventos en BD');

            renderizarEventos(eventosActuales);

        } catch (error) {
            console.warn("Backend no disponible o vacío, usando datos dummy:", error);
            // Usamos los 3 eventos dummy si falla la base de datos
            eventosActuales = eventosDummy;
            renderizarEventos(eventosActuales);
        }
    }

    function renderizarEventos(lista) {
        contenedorEventos.innerHTML = '';
        
        lista.forEach(evento => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full";
            
 
            const rutaImagen = evento.imagen_url || evento.imagenUrl;
            // Si sigue vacío, usamos el banner.
            const imagenSegura = rutaImagen || 'img/banner.jpg'; 

            card.innerHTML = `
                <div class="h-64 overflow-hidden relative">
                    <img src="${imagenSegura}" alt="${evento.titulo}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                         onerror="this.onerror=null;this.src='img/banner.jpg';">
                    
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-100">
                        $${evento.precio}
                    </div>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold mb-3 text-gray-800">${evento.titulo}</h3>
                    <p class="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                        ${evento.descripcion}
                    </p>
                    <div class="flex items-center text-gray-500 text-xs mb-6 font-medium bg-gray-50 p-2 rounded w-fit">
                        <i class="fas fa-users text-yellow-500 mr-2"></i>
                        ${evento.capacidad}
                    </div>
                    <button class="btn-cotizar w-full border-2 border-yellow-500 text-yellow-600 font-bold py-2 rounded hover:bg-yellow-500 hover:text-white transition-colors uppercase text-sm tracking-wider"
                        data-id="${evento.uuid}">
                        Cotizar Evento
                    </button>
                </div>
            `;
            contenedorEventos.appendChild(card);
        });


        document.querySelectorAll('.btn-cotizar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                abrirModal(e.target.dataset.id);
            });
        });
    }

    function abrirModal(uuid) {
        const evento = eventosActuales.find(e => e.uuid == uuid); 
        if (!evento) return;

 
        const rutaImagen = evento.imagen_url || evento.imagenUrl;
        modalImg.src = rutaImagen || 'img/banner.jpg';
        
        modalTitleSide.textContent = evento.titulo;
        modalEventName.textContent = evento.titulo;
        hiddenInputId.value = evento.uuid;

        modalOverlay.classList.remove('hidden-modal');
        modalOverlay.classList.add('visible-modal');

        setTimeout(() => {
            modalContent.classList.remove('modal-scale-out');
            modalContent.classList.add('modal-scale-in');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }

    function cerrarModal() {
        modalContent.classList.remove('modal-scale-in');
        modalContent.classList.add('modal-scale-out');

        setTimeout(() => {
            modalOverlay.classList.remove('visible-modal');
            modalOverlay.classList.add('hidden-modal');
            formReserva.reset();
            document.body.style.overflow = 'auto'; 
        }, 300);
    }

    btnCloseModal.addEventListener('click', cerrarModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) cerrarModal();
    });


    formReserva.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = formReserva.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        btn.disabled = true;

        const formData = new FormData(formReserva);
        const datos = Object.fromEntries(formData.entries());

        const payload = {
            uuid: crypto.randomUUID(),
            eventoId: datos.evento_id,
            nombreCliente: datos.nombre_cliente,
            email: datos.email,
            telefono: datos.telefono,
            fechaEvento: datos.fecha_evento,
            cantidadPersonas: parseInt(datos.cantidad_personas)
        };

        try {
            const response = await fetch('/api/reservar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("¡Reserva guardada con éxito!");
                cerrarModal();
            } else {
                alert("Hubo un error al guardar la reserva.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión (Modo Offline): Datos validados pero no guardados.");
            cerrarModal();
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.remove('bg-transparent', 'text-white', 'py-6');
            nav.classList.add('bg-white', 'text-gray-800', 'shadow-md', 'py-4');
        } else {
            nav.classList.add('bg-transparent', 'text-white', 'py-6');
            nav.classList.remove('bg-white', 'text-gray-800', 'shadow-md', 'py-4');
        }
    });

    cargarEventos();
});