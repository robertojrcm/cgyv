import { Router } from "express";

const router = Router();

import emisorController from "../controllers/emisor.controller";

router.get("/obtenerTodosEmisores",
emisorController.obtenerTodosEmisores);

router.post("/crearEmisor",
emisorController.crearEmisor);

router.get("/obtenerEmisorPorId/:id",
emisorController.obtenerEmisorPorId);

router.put("/actualizarEmisor/:id",
emisorController.actualizarEmisor);

router.delete("/eliminarEmisor/:id",
emisorController.eliminarEmisor);

export { router };