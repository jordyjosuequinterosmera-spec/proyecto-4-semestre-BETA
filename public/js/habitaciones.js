
let inventarioHabitaciones = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    setupModalEvents(); 
});


async function cargarDatos() {
    try {
        
        const respuesta = await fetch('datos_hab.json'); 
        
        
        
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el inventario');
        }

        inventarioHabitaciones = await respuesta.json(); 
        
      
        const container = document.getElementById('rooms-container');
        renderizarHabitaciones(inventarioHabitaciones, container);
        setupFiltros(inventarioHabitaciones, container);

    } catch (error) {
        console.error('Error cargando habitaciones:', error);
        document.getElementById('rooms-container').innerHTML = 
            '<p style="text-align:center; color:red">Error cargando las habitaciones. Intente más tarde.</p>';
    }
}


function renderizarHabitaciones(lista, contenedor) {
    contenedor.innerHTML = ''; 
    
    lista.forEach(hab => {
        const card = document.createElement('article');
        card.classList.add('room-card');
        card.setAttribute('data-category', hab.tipo);
        
        
        card.innerHTML = `
            <div class="room-image">
                <img src="${hab.imagen}" alt="${hab.nombre}" loading="lazy">
                <span class="price-tag">$${hab.precio} / Noche</span>
            </div>
            <div class="room-details">
                <h3>${hab.nombre}</h3>
                <p>${hab.descripcionCorta}</p>
                <div class="amenities">
                    <span><i class="fas fa-wifi"></i> Wifi</span>
                    <span><i class="fas fa-tv"></i> TV</span>
                    <span><i class="fas fa-wind"></i> A/C</span>
                </div>
                <button class="btn-reservar" onclick="abrirModal(${hab.id})">Ver Detalles</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}


function setupFiltros(datos, contenedor) {
    const botones = document.querySelectorAll('.filter-btn');
    
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            
            const filtro = btn.getAttribute('data-filter');
            const datosFiltrados = filtro === 'all' 
                ? datos 
                : datos.filter(h => h.tipo === filtro);
            
            renderizarHabitaciones(datosFiltrados, contenedor);
        });
    });
}

const modal = document.getElementById('room-modal');
const modalBody = document.getElementById('modal-details');

function setupModalEvents() {
    const closeBtn = document.querySelector('.close-btn');
    
    
    closeBtn.onclick = () => cerrarModal();

    window.onclick = (event) => {
        if (event.target == modal) cerrarModal();
    }
}


window.abrirModal = function(id) {
    
    const habitacion = inventarioHabitaciones.find(h => h.id === id); 

    if(!habitacion) return;

    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-img-container">
                <img src="${habitacion.imagen}" alt="${habitacion.nombre}">
            </div>
            <div class="modal-info">
                <span class="modal-subtitle">Categoría: ${habitacion.tipo.toUpperCase()}</span>
                <h2>${habitacion.nombre}</h2>
                <p class="modal-desc">${habitacion.descripcionLarga}</p>
                
                <div class="modal-features">
                    <div class="feature-item"><i class="fas fa-ruler-combined"></i> ${habitacion.tamano}</div>
                    <div class="feature-item"><i class="fas fa-user-friends"></i> ${habitacion.capacidad}</div>
                    <div class="feature-item"><i class="fas fa-bed"></i> ${habitacion.cama}</div>
                    <div class="feature-item"><i class="fas fa-mountain"></i> ${habitacion.vista}</div>
                    <div class="feature-item"><i class="fas fa-wifi"></i> Wifi Alta Velocidad</div>
                    <div class="feature-item"><i class="fas fa-concierge-bell"></i> Servicio 24h</div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
                    <h3 style="color: var(--accent-color); font-size: 1.8rem;">$${habitacion.precio}<span style="font-size: 0.9rem; color: #666;">/noche</span></h3>
                    <button class="btn-book-modal">Reservar Ahora</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}