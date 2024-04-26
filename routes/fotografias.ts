import { Router } from "express";

const router = Router();

import fotografiasController from "../controllers/fotografias.controller";

router.get("/obtenerTodasFotografias",
fotografiasController.obtenerTodasFotografias);

router.post("/crearFotografia",
fotografiasController.crearFotografia);

router.get("/obtenerFotografiaPorId/:id",
fotografiasController.obtenerFotografiaPorId);

router.put("/actualizarFotografia/:id",
fotografiasController.actualizarFotografia);

router.delete("/eliminarFotografia/:id",
fotografiasController.eliminarFotografia);

export { router};