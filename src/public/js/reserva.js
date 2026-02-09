// ===============================
// MODAL RESERVA – CASA BARLOVENTO
// ===============================

// 1. DATA DE HABITACIONES (Inventario)
const inventarioHabitaciones = [
    { "id": 1, "nombre": "Habitación Standard 101", "precio": 85 },
    { "id": 2, "nombre": "Doble Deluxe 205", "precio": 120 },
    { "id": 3, "nombre": "Junior Suite 301", "precio": 250 },
    { "id": 4, "nombre": "Family Room 402", "precio": 180 }
];

// 🔓 ABRIR MODAL DESDE HERO
function abrirModalDesdeHero() {
    const f1 = document.getElementById('fecha-llegada-hero').value;
    const f2 = document.getElementById('fecha-salida-hero').value;

    if (!f1 || !f2) {
        alert("Por favor, elija fechas de entrada y salida antes de continuar.");
        return;
    }

    // Llenar el selector de habitaciones antes de mostrar el modal
    llenarSelectorHabitaciones();

    // Muestra las fechas seleccionadas
    document.getElementById('res-fechas').innerText = `${f1} al ${f2}`;
    
    // Cambia la visibilidad del modal
    const modal = document.getElementById('modal-reserva');
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
}


function llenarSelectorHabitaciones() {
    const select = document.getElementById('res-habitacion');
    if (!select) return;

    
    select.innerHTML = '<option value="" disabled selected>Seleccione una habitación...</option>';
    
    inventarioHabitaciones.forEach(hab => {
        const option = document.createElement('option');
        option.value = hab.id; 
        option.dataset.precio = hab.precio; 
        option.innerText = `${hab.nombre} ($${hab.precio}/noche)`;
        select.appendChild(option);
    });

    
    select.onchange = function() {
        const precioSeleccionado = this.options[this.selectedIndex].dataset.precio;
        document.getElementById('res-total').innerText = `$${precioSeleccionado}.00`;
    };
}


function cerrarModal() {
    const modal = document.getElementById('modal-reserva');
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-datos-cliente');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        
        const selectHab = document.getElementById('res-habitacion');
        const habitacionId = selectHab.value;
        const precioHab = selectHab.options[selectHab.selectedIndex].dataset.precio;

        
        const datos = {
            nombre: document.getElementById('res-nombre').value.trim(),
            email: document.getElementById('res-email').value.trim(),
            telefono: document.getElementById('res-telefono').value.trim(),
            habitacion_id: habitacionId, 
            fechaInicio: document.getElementById('fecha-llegada-hero').value,
            fechaFin: document.getElementById('fecha-salida-hero').value,
            total: parseFloat(precioHab) 
        };

        try {
            const res = await fetch('guardar_reserva.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const resultado = await res.json();

            if (resultado.ok) {
                alert("✅ ¡Reserva guardada con éxito en la base de datos!");
                cerrarModal();
                form.reset();
                document.getElementById('res-total').innerText = "$0.00";
            } else {
                throw new Error(resultado.error || "Error desconocido en el servidor");
            }

        } catch (error) {
            console.error("❌ Error en la petición:", error);
            alert("❌ No se pudo guardar la reserva. Verifique que Apache y MySQL estén activos.");
        }
    });
});


window.abrirModalDesdeHero = abrirModalDesdeHero;
window.cerrarModal = cerrarModal;