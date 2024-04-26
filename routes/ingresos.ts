import { Router } from "express";
import express from 'express';

const router = Router();

import ingresosController from "../controllers/ingresos.controller";

router.get("/obtenerTodosLosIngresos",
    ingresosController.listaringreso
);

router.post("/crearingreso",
    ingresosController.crearingreso
);

router.get("/obteneringreso/:id",
    ingresosController.obteneringreso
);

router.put("/actualizaringreso/:id",
    ingresosController.actualizaringreso
);

router.delete("/eliminaringreso/:id",
    ingresosController.eliminaringreso 
);


export { router }; 