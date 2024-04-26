import fotografiasService from "../services/fotografias.service";
import { Request, Response } from "express";
import { FotografiasDto } from "../interfaces/modelsDtos/fotografiasDto";
const IResponse = require("../utils/IResponse.handle");
import { CIDR } from "sequelize";


const obtenerTodasFotografias = async (req: Request, res: Response) => {
    try {
        const response = await fotografiasService.listaFotografias();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todas las fotografias', false));
    }
};

const validarDatos = (data: any, criteriosValidacion: { campo: string, obligatorio: boolean }[]): boolean => {
    for (const criterio of criteriosValidacion) {
        if (criterio.obligatorio && !data[criterio.campo]) {
            return false;
        }
    }
    return true;
};

const crearFotografia = async (req: Request, res: Response) => {
    try {
        const data: FotografiasDto = req.body;
        const criteriosValidacion = [
            { campo: 'gasto_id', obligatorio: true },
            { campo: 'ruta_archivo', obligatorio: true },
            { campo: 'fecha_creacion', obligatorio: true },
            { campo: 'esta_activo', obligatorio: true }
        ];
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios', false));
            return;
        }  
        const response = await fotografiasService.crearFotografia(data);
        res.status(201).send(IResponse(response, 'Fotografia creada correctamente', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error creando fotografia', false));
    }};

const obtenerFotografiaPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await fotografiasService.obtenerFotografiaPorId(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Fotografia no encontrada', false));
            return;
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo fotografia', false));
    } };

const actualizarFotografia = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const datosActualizados = req.body as FotografiasDto;
        const response = await fotografiasService.actualizarFotografia(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'Fotografia no encontrada', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Fotografia actualizada correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando fotografia', false));
    }};

const eliminarFotografia = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await fotografiasService.eliminarFotografia(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Fotografia no encontrada', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Fotografia eliminada correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando fotografia', false));
    }};

export default { obtenerTodasFotografias, crearFotografia, obtenerFotografiaPorId, actualizarFotografia, eliminarFotografia };