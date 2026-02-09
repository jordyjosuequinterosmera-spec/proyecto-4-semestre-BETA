
export class FAQServicio {
  
  
  private readonly preguntasFrecuentes: Record<string, string> = {
    horarios: "El Check-in es a las 14:00 y el Check-out a las 12:00. [cite: 5]",
    mascotas: "Lo sentimos, por políticas de convivencia no se aceptan mascotas. [cite: 5]",
    ubicacion: "Estamos en Olón, Santa Elena, a pocos metros de la playa. [cite: 4]",
    servicios: "Ofrecemos Wi-Fi, parqueadero privado, y áreas familiares. [cite: 28]",
    cancelaciones: "Las reservas pueden cancelarse sin costo hasta 48 horas antes de la llegada. [cite: 5]",
    eventos: "Contamos con información sobre tours locales y eventos en la zona costera de Olón. "
  };

  
  obtenerRespuesta(categoria: string): string {
    const respuesta = this.preguntasFrecuentes[categoria.toLowerCase()];
    
    if (respuesta) {
      return respuesta;
    }

    return "Lo siento, no tengo información específica sobre eso. ¿Te gustaría hablar con un recepcionista? ";
  }

  
  obtenerCategoriasDisponibles(): string[] {
    return Object.keys(this.preguntasFrecuentes);
  }
}