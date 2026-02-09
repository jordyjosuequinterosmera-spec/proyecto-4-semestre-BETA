export class Cliente {
  private id: string;
  private nombres: string;
  private email: string;
  private telefono: string;
  private fechaCreacion: Date;

  private constructor(
    id: string,
    nombres: string,
    email: string,
    telefono: string,
    fechaCreacion: Date
  ) {
    this.id = id;
    this.nombres = nombres;
    this.email = email;
    this.telefono = telefono;
    this.fechaCreacion = fechaCreacion;
  }

  
  static crear(nombres: string, email: string, telefono: string): Cliente {
    
    if (!nombres || nombres.trim().length < 3) {
      throw new Error("El nombre del cliente debe tener al menos 3 caracteres.");
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del correo electrónico es inválido.");
    }

   
    if (!telefono || telefono.length < 7) {
      throw new Error("El número de teléfono es inválido.");
    }

    return new Cliente(
      crypto.randomUUID(),
      nombres.trim(),
      email.toLowerCase().trim(),
      telefono.trim(),
      new Date()
    );
  }

 
  public getId(): string { return this.id; }
  public getNombre(): string { return this.nombres; } 
  public getTelefono(): string { return this.telefono; }
  public getFechaCreacion(): Date { return this.fechaCreacion; }
}