export class Reserva {
    constructor(
        public uuid: string,
        public eventoId: string,
        public nombreCliente: string,
        public email: string,
        public telefono: string,
        public fechaEvento: Date,
        public cantidadPersonas: number
    ) {}
}
