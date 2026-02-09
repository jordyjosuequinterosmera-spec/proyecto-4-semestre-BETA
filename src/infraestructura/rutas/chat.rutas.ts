import { Router } from "express";
import { ChatControlador } from "../Controladores/ChatControlador";


const router = Router();
const chatControlador = new ChatControlador();


router.post("/", chatControlador.responderMensaje);

export default router;