import { Router } from "express";

const router = Router();

import inicioSesionController from "../controllers/inicioSesion.controller";

router.post("/inicioSesion",
inicioSesionController.crearinicioSesion);

export { router };