import { Request, Response } from "express";
import suscriptorTiposServices from "../services/suscriptorTipos.services";
const IResponse = require("../utils/IResponse.handle");

const getSuscriptorTipos = async (req: Request, res: Response) => {
    try {
      const response = await suscriptorTiposServices.obtenersuscriptorTipos();
      res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error Obteniendo suscriptorestipos', false));
    }
};



export default { getSuscriptorTipos };