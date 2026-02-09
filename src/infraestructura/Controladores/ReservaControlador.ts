import { Request, Response } from "express";

export class ReservaControlador {
  async crearReserva(req: Request, res: Response) {
    try {
      const datos = req.body;

      console.log("📥 Reserva recibida:", datos);

      res.status(201).json({
        mensaje: "✅ Reserva guardada correctamente",
        datos
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "❌ Error al guardar la reserva",
        error
      });
    }
  }
}
