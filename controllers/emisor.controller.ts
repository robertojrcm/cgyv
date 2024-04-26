import { emisoresDto } from "../interfaces/modelsDtos/emisoresDto";
const IResponse = require("../utils/IResponse.handle");
import emisoresServices from "../services/emisores.service";
import { Request, Response } from "express";

const obtenerTodosEmisores = async (req: Request, res: Response) => {
    try {
        const response = await emisoresServices.listaemisor();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todos los emisores', false));
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

const crearEmisor = async (req: Request, res: Response) => {
    try {
        const data: emisoresDto = req.body;
        const criteriosValidacion = [
            { campo: 'establecimiento_id', obligatorio: true },
            { campo: 'rfc', obligatorio: true },
            { campo: 'razon_social', obligatorio: true },
            { campo: 'domicilio_fiscal', obligatorio: true },
            { campo: 'esta_activo', obligatorio: true }
        ];
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios', false));
            return;
        }  
        const response = await emisoresServices.crearemisor(data);
        res.status(201).send(IResponse(response, 'Emisor creado correctamente', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error creando emisor', false));
    }};

const obtenerEmisorPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await emisoresServices.obteneremisorPorId(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Emisor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo emisor', false));
    } };

const actualizarEmisor = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const datosActualizados = req.body as emisoresDto;
        const response = await emisoresServices.actualizaremisor(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'Emisor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Emisor actualizado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando emisor', false));
    }
};

const eliminarEmisor = async (req: Request, res: Response) => { 
    try {
        const id = Number(req.params.id);
        const response = await emisoresServices.eliminaremisor(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Emisor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Emisor eliminado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando emisor', false));
    }
};

export default { obtenerTodosEmisores, crearEmisor, obtenerEmisorPorId, actualizarEmisor, eliminarEmisor };