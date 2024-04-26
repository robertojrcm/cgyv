import { Router } from "express";
import { Request, Response } from "express"; // Importa los tipos Request y Response

import SaldoGlobalController from "../controllers/saldoGlobal.controller"; // Importa la función correctamente

const router = Router();

router.post("/obtenerSaldoGlobal",  
SaldoGlobalController.obtenerSaldoGlobal
);

export { router };
