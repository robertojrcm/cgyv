import { Request, Response } from "express";
import gastoCategoriaService from "../services/gastoCategoria.service";
import { gastoCategoriaDto } from "../interfaces/modelsDtos/gastoCategoriaDto";
const IResponse = require("../utils/IResponse.handle");

const listarGastocategoria = async (req: Request, res: Response) => {
    try {
      const response = await gastoCategoriaService.obtenerTodosGastoCategorias();
      res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todos los gastos categoria', false));
    }
};

const validarDatos = (data: any, criterios: {campo: string, obligatorio:boolean} []): boolean => {
 for ( const criterio of criterios) {
  if (criterio.obligatorio && !data[criterio.campo]) {
   return false;
  }
  if (typeof data[criterio.campo] !== 'boolean' && typeof data[criterio.campo] !== 'undefined') {
   }
  }
  return true;
};

const crearGastoCategoria = async (req: Request, res: Response) => {
  try {
    const data: gastoCategoriaDto = req.body;
    const criteriosValidacion: { campo: string; obligatorio: boolean }[] = [
      { campo: 'nombre', obligatorio: true },
      { campo: 'icono_url', obligatorio: true }
    ];
    if (!validarDatos(data, criteriosValidacion)) {
      res.status(400).send(IResponse(null, 'Faltan datos obligatorios o no cumplen con las restricciones', false));
      return;
    }
    const response = await gastoCategoriaService.crearGastoCategoria(data);
    res.status(201).send(IResponse(response, 'Gasto categoria creado correctamente', true));
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error creando gasto categoria', false));
  }
  };

const obtenerGastoCategoriaPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const response = await gastoCategoriaService.obtenerGastoCategoriaPorId(id);
    if (!response) {
      res.status(404).send(IResponse(null, 'Gasto categoria no encontrado', false));
      return;
    }else {
      res.status(200).send(IResponse(response, '', true));
    }
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error obteniendo gasto categoria', false));
  }};

const actualizarGastoCategoria = async (req: Request, res: Response) => {
  try{
    const id = Number(req.params.id);
    const datosActualizados = req.body as gastoCategoriaDto;
    const response = await gastoCategoriaService.actualizarGastoCategoria(id, datosActualizados);
    if (!response) {
      res.status(404).send(IResponse(null, 'Gasto categoria no encontrado', false));
      return;
    } else {
      res.status(200).send(IResponse(response, 'Gasto categoria actualizado correctamente', true));
    }
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error actualizando gasto categoria', false));
  }};

const eliminarGastoCategoria = async (req: Request, res: Response) => {
  try{
    const id = Number(req.params.id);
    const response = await gastoCategoriaService.eliminarGastoCategoria(id);
    if (!response) {
      res.status(404).send(IResponse(null, 'Gasto categoria no encontrado', false));
      return;
    } else {
      res.status(200).send(IResponse({}, 'Gasto categoria eliminado correctamente', true));
    }
  } catch (ex) {
    res.status(500).send(IResponse(ex, 'Error eliminando gasto categoria', false));
  }};

export default { listarGastocategoria, crearGastoCategoria, obtenerGastoCategoriaPorId, actualizarGastoCategoria, eliminarGastoCategoria};
