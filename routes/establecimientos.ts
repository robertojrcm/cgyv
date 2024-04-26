import { Router,Response } from "express";
import express from 'express';

const router = Router();

import establecimientosController from "../controllers/establecimientos.controller";

router.get("/obtenerEstablecimientoPorId/:id",
    establecimientosController.obtenerEstablecimientoPorId
);

router.get("/listarEstablecimientos",
    establecimientosController.listarEstablecimientos
);

router.post("/crearEstablecimiento",
    establecimientosController.CrearEstablecimiento
);

router.put("/actualizarEstablecimiento/:id",
    establecimientosController.actualizarEstablecimiento
);

router.delete("/eliminarEstablecimiento/:id",
    establecimientosController.eliminarEstablecimiento
);

router.post("/procesarSolicitud/:id", 
    establecimientosController.procesarSolicitud 
);

export { router };

