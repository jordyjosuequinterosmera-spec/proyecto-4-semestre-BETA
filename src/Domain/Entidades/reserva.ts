export class Reserva {
    constructor(
        public cliente_id: string,
        public fecha_inicio: string,
        public fecha_fin: string,
        public total: number
    ) {}
}
