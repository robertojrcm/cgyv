import { Router, response } from "express";
import express from 'express';

const router = Router();

import usuariosController from "../controllers/usuarios.controller";


router.post("/crearUsuario",
    usuariosController.crearUsuario
);

export { router }; 