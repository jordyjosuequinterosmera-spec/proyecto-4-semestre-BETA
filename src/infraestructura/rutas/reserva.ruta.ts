import { Router } from "express";
import { ReservaControlador } from "..//Controladores/ReservaControlador";

const router = Router();
const controlador = new ReservaControlador();

router.post("/", controlador.crearReserva);

export default router;
