export class Cotizacion {
  private id: string;
  private noches: number;
  private precioPorNoche: number;
  private total: number;
  private fechaCreacion: Date;

  private constructor(
    id: string,
    noches: number,
    precioPorNoche: number,
    total: number,
    fechaCreacion: Date
  ) {
    this.id = id;
    this.noches = noches;
    this.precioPorNoche = precioPorNoche;
    this.total = total;
    this.fechaCreacion = fechaCreacion;
  }

  
  static crear(noches: number, precioPorNoche: number): Cotizacion {
    if (noches <= 0) {
      throw new Error("El número de noches debe ser mayor a cero");
    }

    if (precioPorNoche <= 0) {
      throw new Error("El precio por noche debe ser un valor positivo");
    }

    const totalCalculado = noches * precioPorNoche;

    return new Cotizacion(
      crypto.randomUUID(),
      noches,
      precioPorNoche,
      totalCalculado,
      new Date()
    );
  }


  public getId(): string { return this.id; }
  public getNoches(): number { return this.noches; }
  public getPrecioPorNoche(): number { return this.precioPorNoche; }
  public getTotal(): number { return this.total; }
  public getFechaCreacion(): Date { return this.fechaCreacion; }
}