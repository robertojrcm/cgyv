import { Request, Response } from "express";
import usuariosServices from "../services/usuarios.services";
import suscriptoresService from "../services/suscriptores.service";
const IResponse = require("../utils/IResponse.handle");




const crearUsuario = async (req: Request, res: Response) => {
  try {
      const response = await usuariosServices.crearUsuario(req.body);
      if (response.isValid) {
          res.status(409).send(IResponse(response.data, response.menssage, false));
      } else {
          res.status(200).send(IResponse(response, '', true));
      }
  } catch (ex) {
      res.status(500).send(IResponse(ex, 'Error creando usuarios', false));
  }
};




export default { crearUsuario };
