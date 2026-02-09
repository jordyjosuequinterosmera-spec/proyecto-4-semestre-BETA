import { Cotizacion } from "../../Domain/Entidades/cotizacion";


export class CotizacionServicio {
  
  private readonly TARIFA_BASE_NOCHE = 35; 

  /**
   * Calcula la cotización integrando la lógica de negocio de Casa Barlovento.
   * @param noches Número de noches de estadía.
   * @param personas Número de personas (opcional para mayor precisión).
   * @returns Instancia de Cotizacion con el total calculado.
   */
  calcular(noches: number, personas: number = 1): Cotizacion {
    
    if (noches <= 0) {
      throw new Error("El número de noches debe ser mayor a cero.");
    }

    
    const factorPersonas = personas > 2 ? 1.2 : 1.0; // Recargo del 20% si son más de 2 personas
    const precioFinalPorNoche = this.TARIFA_BASE_NOCHE * factorPersonas;

    return Cotizacion.crear(noches, precioFinalPorNoche);
  }

 
  obtenerTextoInformativo(noches: number, personas: number): string {
    const cotizacion = this.calcular(noches, personas);
    return `La tarifa para ${personas} persona(s) por ${noches} noche(s) es de $${cotizacion.getTotal()}. ` +
           `Esto incluye acceso a Wi-Fi y parqueadero[cite: 16].`;
  }
}