import { Request, Response } from "express";
import { ChatbotServicio } from "../../aplicacion/servicios/ChatbotServicio";


export class ChatControlador {
  private chatbotServicio: ChatbotServicio;

  constructor() {
    
    this.chatbotServicio = new ChatbotServicio();
  }

  
  responderMensaje = (req: Request, res: Response) => {
    try {
      const { mensaje } = req.body;

      
      if (!mensaje || typeof mensaje !== 'string') {
        return res.status(400).json({
          exito: false,
          error: "El mensaje es obligatorio y debe ser un texto válido."
        });
      }

      
      const respuestaBot = this.chatbotServicio.procesarMensaje(mensaje);

      // Respuesta exitosa al frontend
      return res.status(200).json({
        exito: true,
        datos: {
          respuesta: respuestaBot.getContenido(),
          emisor: respuestaBot.getEmisor(),
          fecha: new Date().toISOString()
        }
      });

    } catch (error: any) {
      
      console.error("Error en ChatControlador:", error.message);
      return res.status(500).json({
        exito: false,
        error: "Ocurrió un error interno al procesar su consulta. Por favor, intente más tarde."
      });
    }
  };
}
