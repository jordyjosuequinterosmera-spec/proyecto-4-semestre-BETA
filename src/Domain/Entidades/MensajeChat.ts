export class MensajeChat {
  private id: string;
  private contenido: string;
  private emisor: "CLIENTE" | "BOT";
  private fecha: Date;

  constructor(contenido: string, emisor: "CLIENTE" | "BOT") {
    if (!contenido.trim()) {
      throw new Error("El mensaje no puede estar vacío");
    }

    this.id = crypto.randomUUID();
    this.contenido = contenido;
    this.emisor = emisor;
    this.fecha = new Date();
  }

  getContenido() { return this.contenido; }
  getEmisor() { return this.emisor; }
}
