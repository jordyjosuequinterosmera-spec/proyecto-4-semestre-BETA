import { Evento } from "./evento.entity";
import { Reserva } from "./reserva.entity";

export interface EventoRepository {
    listarEventos(): Promise<Evento[]>;
    buscarEventoPorId(uuid: string): Promise<Evento | null>;
    guardarReserva(reserva: Reserva): Promise<Reserva>;
}
