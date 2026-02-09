import { Reserva } from '../../Domain/Entidades/reserva';
import { ReservaRepositorioMySQL } from '../../infraestructura/repositorios/ReservaRepositorioMySQL';

export class ReservaServicio {
    constructor(private repo = new ReservaRepositorioMySQL()) {}

    async crearReserva(datos: any) {
        const reserva = new Reserva(
            datos.cliente_id,
            datos.fecha_inicio,
            datos.fecha_fin,
            datos.total
        );

        await this.repo.guardar(reserva);
    }
}
