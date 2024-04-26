import { Router, response } from "express";
import express from 'express';

const router = Router();

import gastoCategoriaController from "../controllers/gastoCategoria.controller";

router.get("/obtenerTodosGastoCategorias", 
gastoCategoriaController.listarGastocategoria
);

router.post("/crearGastoCategoria",
gastoCategoriaController.crearGastoCategoria
);

router.get("/obtenerGastoCategoriaPorId/:id",
gastoCategoriaController.obtenerGastoCategoriaPorId
);

router.put("/actualizarGastoCategoria/:id",
gastoCategoriaController.actualizarGastoCategoria
);

router.delete("/eliminarGastoCategoria/:id",
gastoCategoriaController.eliminarGastoCategoria
);

export { router }; 