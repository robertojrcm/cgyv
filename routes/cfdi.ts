import { Router } from "express";

const router = Router();

import cfdiController from "../controllers/cfdi.controller";

router.get("/obtenerTodosCfdis",
cfdiController.obtenerTodosCFDI);

router.post("/crearCfdi",
cfdiController.crearCFDI);

router.get("/obtenerCfdiPorId/:id",
cfdiController.obtenerCFDIPorId);

router.put("/actualizarCfdi/:id",
cfdiController.actualizarCFDI);

router.delete("/eliminarCfdi/:id",
cfdiController.eliminarCFDI);

export { router };