import { Router, response } from "express";
import express from 'express';

const router = Router();

import FormaPagoController from "../controllers/FormaPago.controller";

router.get("/obtenerTodosFormaPago", 
FormaPagoController.obtenerTodosFormaPago);

router.post("/crearFormaPago",
FormaPagoController.crearFormaPago);

router.get("/obtenerFormaPagoPorId/:id",
FormaPagoController.obtenerFormaPagoPorId);

router.put("/actualizarFormaPago/:id",
FormaPagoController.actualizarFormaPago);

router.delete("/eliminarFormaPago/:id",
FormaPagoController.eliminarFormaPago);



export { router }; 