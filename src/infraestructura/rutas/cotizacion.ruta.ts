import { Router } from "express";
import { CotizacionControlador } from "../Controladores/CotizacionControlador";


const router = Router();
const cotizacionControlador = new CotizacionControlador();


router.post("/", cotizacionControlador.obtenerCotizacion);

export default router;