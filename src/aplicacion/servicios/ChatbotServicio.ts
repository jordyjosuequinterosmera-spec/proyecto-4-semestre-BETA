import { MensajeChat } from "../../Domain/Entidades/MensajeChat";
import { Cotizacion } from "../../Domain/Entidades/cotizacion";


export class ChatbotServicio {
  
  
  private readonly conocimientoHotel = {
    ubicacion: "📍 Estamos ubicados en Olón, Santa Elena, a pocos metros del mar.",
    servicios: "Ofrecemos hospedaje familiar, Wi-Fi, parqueadero y atención personalizada[cite: 5].",
    horarios: "El Check-in es a las 14:00 y el Check-out a las 12:00.",
    politicas: "No se permiten mascotas. Las cancelaciones deben hacerse con 48h de anticipación."
  };

  
  public procesarMensaje(textoUsuario: string): MensajeChat {
    const mensaje = textoUsuario.toLowerCase().trim();

    
    if (this.match(mensaje, ["hola", "buenas", "buen día", "saludos"])) {
      return new MensajeChat(
        "¡Hola! 👋 Bienvenido a Casa Barlovento. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? (Cotizaciones, Ubicación, Servicios)",
        "BOT"
      );
    }

    
    if (this.match(mensaje, ["precio", "costo", "tarifa", "cotizar", "cuanto vale"])) {
      
      const nochesSimuladas = 1;
      const tarifaBase = 35; 
      const cotizacion = Cotizacion.crear(nochesSimuladas, tarifaBase); 
      
      return new MensajeChat(
        `Para una estancia de ${nochesSimuladas} noche(s), el total estimado es de $${cotizacion.getTotal()}. ¿Deseas que te ayude a concretar la reserva? [cite: 15]`,
        "BOT"
      );
    }

    
    if (this.match(mensaje, ["donde", "ubicacion", "direccion", "llegar", "olon"])) {
      return new MensajeChat(this.conocimientoHotel.ubicacion, "BOT");
    }

    
    if (this.match(mensaje, ["servicios", "ofrecen", "incluye", "desayuno", "eventos"])) {
      return new MensajeChat(this.conocimientoHotel.servicios, "BOT");
    }

    
    if (this.match(mensaje, ["horario", "check", "politica", "reglas", "mascotas"])) {
      return new MensajeChat(
        `${this.conocimientoHotel.horarios} | ${this.conocimientoHotel.politicas}`,
        "BOT"
      );
    }

    
    return new MensajeChat(
      "Lo siento, no logré entender tu consulta. 🤖 Puedo ayudarte con precios, ubicación o servicios de Casa Barlovento. ¿Qué te gustaría saber?",
      "BOT"
    );
  }

  
private match(texto: string, palabrasClave: string[]): boolean {
  
  const textoMinusculas = texto.toLowerCase();
  
  return palabrasClave.some((palabra: string) => 
    textoMinusculas.includes(palabra.toLowerCase())
  );
}
}