import mongoose, { Schema, Document } from 'mongoose';
import { Cliente } from "../../Domain/Entidades/cliente";


interface IClienteDoc extends Document {
  nombre: string;
  email: string;
  telefono: string;
  fechaRegistro: Date;
}


const ClienteSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

const ClienteModel = mongoose.model<IClienteDoc>('Cliente', ClienteSchema);


export class ClienteRepositorioMongo {
  
  /**
   * Guarda o actualiza un cliente en la base de datos.
   * @param cliente Entidad de dominio Cliente.
   */
  async guardar(cliente: Cliente): Promise<void> {
    try {
      
      await ClienteModel.findOneAndUpdate(
        
        {
          nombre: cliente.getNombre(),
          telefono: cliente.getTelefono(),
          fechaRegistro: new Date()
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error("Error al persistir el cliente en MongoDB:", error);
      throw new Error("Error de infraestructura al guardar los datos del cliente.");
    }
  }

  
  async buscarPorEmail(email: string): Promise<IClienteDoc | null> {
    return await ClienteModel.findOne({ email }).exec();
  }
}