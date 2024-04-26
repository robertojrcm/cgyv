import { Request, Response } from "express";
import autenticarNumeroService from "../services/autenticarNumero.service";
const IResponse = require("../utils/IResponse.handle");

const generarPin = async (req: Request, res: Response) => {
    try {
      const response = await autenticarNumeroService.crearPin(req.body);
      res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error al generar pin', false));
    }
  };


  const ValidarPin = async (req: Request, res: Response) => {
    try {
      const response = await autenticarNumeroService.validarPin(req.body);
      if(response.isValid == false){
        res.status(409).send(IResponse(response.data, response.menssage, false));
      }
      res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error al validar el pin', false));
    }
  };

export default { generarPin , ValidarPin};