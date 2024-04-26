import { Router, response } from "express";
import express from 'express';

const router = Router();

import autentificarNumeroController from "../controllers/autentificarNumero.controller";


router.post("/generarPin",
    autentificarNumeroController.generarPin
);

router.post("/validarPin",
    autentificarNumeroController.ValidarPin
);


export { router }; 