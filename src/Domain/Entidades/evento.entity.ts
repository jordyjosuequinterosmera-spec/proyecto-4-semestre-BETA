export class Evento {
    constructor(
        public uuid: string,
        public titulo: string,
        public descripcion: string,
        public precio: number,
        public capacidad: string,
        public imagenUrl: string
    ) {}
}
