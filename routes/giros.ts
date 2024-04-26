 import { Router, response } from "express";
 import express from 'express';

 const router = Router();

import girosController from "../controllers/giros.controller";

 router.get("/obtenerTodosLosGiros", 
    girosController.listarGiros
 );

 router.get("/obtenerGiroPorId/:id",
      girosController.obtenerGiroPorId
   );

 router.post("/crearGiro", 
    girosController.CrearGiro
 );

 router.put("/actualizarGiro/:id", 
    girosController.actualizarGiro
 );

 router.delete("/eliminarGiro/:id",
      girosController.eliminarGiro
   );

 export { router }; 