import { Request, Response } from "express";
import inicioSesionService from "../services/inicioSesion.service";
import { inicioSesionDto } from "../interfaces/modelsDtos/inicioSesionDto";
const IResponse = require("../utils/IResponse.handle");

const validarDatos = (data: any, criteriosValidacion: { campo: string, obligatorio: boolean, minCaracteres?: number, maxCaracteres?: number }[]): boolean => {
  for (const criterio of criteriosValidacion) {
      if (criterio.obligatorio && !data[criterio.campo]) {
          return false;
      }
      if (typeof data[criterio.campo] !== 'boolean' && typeof data[criterio.campo] !== 'undefined') {
          if (criterio.minCaracteres && data[criterio.campo].length < criterio.minCaracteres) {
              return false;
          }
          if (criterio.maxCaracteres && data[criterio.campo].length > criterio.maxCaracteres) {
              return false;
          }
      }
  }
  return true;
};
 
const crearinicioSesion = async (req: Request, res: Response) => {
  try {
    const inicioSesionData: inicioSesionDto = req.body;
    const criteriosValidacion = [
      { campo: 'token', obligatorio: true },
      { campo: 'usuario_id', obligatorio: true },
      { campo: 'dispositivo', obligatorio: true },
      { campo: 'latitud', obligatorio: true },
      { campo: 'longitud', obligatorio: true },
      { campo: 'sesion_activa', obligatorio: true },
      { campo: 'sistema_operativo', obligatorio: true },
      { campo: 'fecha_hora_inicio', obligatorio: true },
      { campo: 'fecha_hora_cierre', obligatorio: true } ];
    if (!validarDatos(inicioSesionData, criteriosValidacion)) {
      res.status(400).send(IResponse(null, 'Faltan datos obligatorios o no cumplen con las restricciones', false));
      return;
    }
  const response = await inicioSesionService.crearinicioSesion(inicioSesionData);
 res.status(200).send(IResponse(response, 'inicioSesion creado correctamente', true));
  } 
  catch (ex) {
    res.status(500).send(IResponse(ex, 'Error registrando inicio   Sesion ' , false));
  }
};
export default { crearinicioSesion };
