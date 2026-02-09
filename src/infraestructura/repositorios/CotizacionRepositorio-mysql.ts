import mongoose, { Schema, Document } from 'mongoose';
import { Cotizacion } from "../../Domain/Entidades/cotizacion";


interface ICotizacionDoc extends Document {
  noches: number;
  precioPorNoche: number;
  total: number;
  fechaCreacion: Date;
}


const CotizacionSchema = new Schema({
  noches: { type: Number, required: true },
  precioPorNoche: { type: Number, required: true },
  total: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const CotizacionModel = mongoose.model<ICotizacionDoc>('Cotizacion', CotizacionSchema);


export class CotizacionRepositorioMongo {

  /**
   * Guarda una cotización generada por el sistema.
   * @param cotizacion Entidad de dominio Cotizacion.
   */
  async guardar(cotizacion: Cotizacion): Promise<void> {
    try {
      const nuevaCotizacion = new CotizacionModel({
        noches: cotizacion.getNoches(),
        precioPorNoche: cotizacion.getPrecioPorNoche(),
        total: cotizacion.getTotal(),
        fechaCreacion: new Date()
      });

      await nuevaCotizacion.save();
    } catch (error) {
      console.error("Error al guardar la cotización en MongoDB:", error);
      throw new Error("No se pudo registrar la cotización en la base de datos.");
    }
  }

  
  async obtenerHistorial() {
    return await CotizacionModel.find().sort({ fechaCreacion: -1 }).limit(100).exec();
  }
}