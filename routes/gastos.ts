import { Router, response } from "express";
import express from 'express';

const router = Router();

import gastosController from "../controllers/gastos.controller";


router.get("/obtenerTodosLosGastos",
    gastosController.listarGasto
);

router.post("/crearGasto",
    gastosController.crearGasto
);

router.get("/obtenergasto/:id",
    gastosController.obtenerGasto
);

router.put("/actualizarGasto/:id",
    gastosController.actualizarGasto
);

router.delete("/eliminarGasto/:id",
    gastosController.eliminarGasto
);


export { router }; 