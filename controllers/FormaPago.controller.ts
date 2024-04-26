import { Request, Response } from "express";
import FormaPagoServices from "../services/FormaPago.services";
import { FormaPagoDto } from "../interfaces/modelsDtos/FormaPagoDto";
const IResponse = require("../utils/IResponse.handle");

const obtenerTodosFormaPago = async (req: Request, res: Response) => {
    try {
      const response = await FormaPagoServices.obtenerTodosFormaPago();
      res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todos los metodos tipos', false));
    }
};

const validarDatos = (data: any, criteriosValidacion: {campo :string, obligatorio: boolean ,minCaracteres?:number , maxCaracteres?: number }[]): boolean => {
 for (const criterio of criteriosValidacion){
  if (criterio.obligatorio && !data[criterio.campo]){
   return false;
  }
if (typeof data[criterio.campo] !== 'boolean' && typeof data[criterio.campo] !== 'undefined'){
 if (criterio.minCaracteres && data[criterio.campo].length < criterio.minCaracteres){
  return false;
 }
 if (criterio.maxCaracteres && data[criterio.campo].length > criterio.maxCaracteres){
  return false;
 }
}
  }
return true;
};

const crearFormaPago = async (req: Request, res: Response) => {
  try {
    const data: FormaPagoDto = req.body;
    const criteriosValidacion = [
      { campo: 'nombre', obligatorio: true },
      { campo: 'esta_activo', obligatorio: true }
    ];
    if (!validarDatos(data, criteriosValidacion)) {
      res.status(400).send(IResponse(null, 'Faltan datos obligatorios o no cumplen con las restricciones', false));
      return;
    }

    const response = await FormaPagoServices.crearFormaPago(data);
    res.status(201).send(IResponse(response, 'Metodo creado correctamente', true));
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error creando metodo', false));

  }
};

const obtenerFormaPagoPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const response = await FormaPagoServices.obtenerFormaPagoPorId(id);
    if (!response) {
      res.status(404).send(IResponse(null, 'Metodo no encontrado', false));
      return;
    } else {
      res.status(200).send(IResponse(response, '', true));
    };
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error obteniendo metodo', false));
  }
}

const actualizarFormaPago = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const datosActualizados = req.body as FormaPagoDto;
    const response = await FormaPagoServices.actualizarFormaPago(id, datosActualizados);
    if (!response) {
      res.status(404).send(IResponse(null, 'Metodo no encontrado', false));
    } else {
      res.status(200).send(IResponse(response, 'Metodo actualizado correctamente', true));
    }
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error actualizando metodo', false));
  }
};

const eliminarFormaPago = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const response = await FormaPagoServices.eliminarFormaPago(id);
    if (!response) {
      res.status(404).send(IResponse(null, 'Metodo no encontrado', false));
    } else {
      res.status(200).send(IResponse(response, 'Metodo eliminado correctamente', true));
    }
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error eliminando metodo', false));
  }
}

export default { obtenerTodosFormaPago, crearFormaPago, obtenerFormaPagoPorId, actualizarFormaPago, eliminarFormaPago};
