import { Request, Response } from "express";
import { EventoUseCase } from "../../application/evento.usecase";

export class EventoController {
    constructor(private eventoUseCase: EventoUseCase) {}

    public getCtrl = async ({ res }: { res: Response }) => {
        const eventos = await this.eventoUseCase.obtenerEventos();
        res.send({ eventos });
    };

    public postReservaCtrl = async ({ body, res }: { body: any, res: Response }) => {
        const reserva = await this.eventoUseCase.registrarReserva(body);
        res.send({ reserva });
    };
}
