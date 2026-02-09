import { EventoRepository } from "../domain/evento.repository";
import { Reserva } from "../domain/reserva.entity";

export class EventoUseCase {
    constructor(private readonly eventoRepository: EventoRepository) {}

    public async obtenerEventos() {
        const eventos = await this.eventoRepository.listarEventos();
        return eventos;
    }

    public async registrarReserva(reserva: Reserva) {
        return await this.eventoRepository.guardarReserva(reserva);
    }
}
