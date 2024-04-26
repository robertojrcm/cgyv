import { Router } from "express";
import express from 'express';

const router = Router();

import receptoresController from "../controllers/receptores.controller";

router.get("/obtenerReceptorPorId/:id",
receptoresController.obtenerReceptorPorId);

router.get("/obtenerTodosReceptores",
receptoresController.obtenerTodosReceptores);

router.post("/crearReceptor",
receptoresController.crearReceptor);

router.put("/actualizarReceptor/:id",
receptoresController.actualizarReceptor);

router.delete("/eliminarReceptor/:id",
receptoresController.eliminarReceptor);

export { router }; 