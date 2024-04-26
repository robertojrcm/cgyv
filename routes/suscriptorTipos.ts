import { Router, response } from "express";
import express from 'express';

const router = Router();

import suscriptorTiposController from "../controllers/suscriptorTipos.controller";

router.get("/obtenersuscriptoresTipos", 
suscriptorTiposController.getSuscriptorTipos
);


export { router }; 