import { Request, Response } from "express";
import girosService from "../services/giros.service";
const IResponse = require("../utils/IResponse.handle");

const listarGiros = async (req: Request, res: Response) => {
  try {
      const response = await girosService.listarGiros();
      res.status(200).send(IResponse(response, '', true));
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error obteniendo giros', false));
  }
};

const obtenerGiroPorId = async (req: Request, res: Response) => {
  try {
      const giroId = Number(req.params.id); 
      const response = await girosService.obtenerGiroPorId(giroId); 
      res.status(200).send(IResponse(response, '', true));
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error obteniendo giros', false));
  }
};


const CrearGiro = async (req: Request, res: Response) => {
  try {
      const nuevoGiro = req.body;
      const response = await girosService.creargiro(nuevoGiro);
      res.status(201).send(IResponse(response, 'Giro creado con éxito', true));
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error creando giro', false));
  }
};

const actualizarGiro = async (req: Request, res: Response) => {
  try {
      const giroId = Number(req.params.id);
      const updatedGiro = req.body;
      const response = await girosService.actualizarGiro(giroId, updatedGiro);
      res.status(200).send(IResponse(response, 'Giro actualizado con éxito', true));
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error actualizando giro', false));
  }
};

const eliminarGiro = async (req: Request, res: Response) => {
  try {
      const giroId = Number(req.params.id);
      const response = await girosService.eliminarGiro(giroId);
      res.status(200).send(IResponse(response, 'Giro eliminado con éxito', true));
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error eliminando giro', false));
  }
};

export default { listarGiros,obtenerGiroPorId , CrearGiro, eliminarGiro, actualizarGiro };