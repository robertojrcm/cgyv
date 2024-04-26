 
import { receptoresDto } from "../interfaces/modelsDtos/receptoresDto";
const IResponse = require("../utils/IResponse.handle");
import receptoresServices from "../services/receptores.service";
import { Request, Response } from "express";

const obtenerTodosReceptores = async (req: Request, res: Response) => {
    try {
        const response = await receptoresServices.listarreceptores();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todos los receptores', false));
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

const crearReceptor = async (req: Request, res: Response) => {
    try {
        const data: receptoresDto = req.body;
        const criteriosValidacion = [
            { campo: 'suscriptor_id', obligatorio: true },
            { campo: 'uso_cfdi_id', obligatorio: true },
            { campo: 'razon_social', obligatorio: true },
            { campo: 'rfc', obligatorio: true },
            { campo: 'domicilio_fiscal', obligatorio: true },
            { campo: 'esta_activo', obligatorio: true }
        ];
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios', false));
            return;
        }

        const response = await receptoresServices.crearReceptor(data);
        res.status(201).send(IResponse(response, 'Receptor creado correctamente', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error creando receptor', false));
    }
};

const obtenerReceptorPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await receptoresServices.obtenerReceptorPorId(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Receptor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo receptor', false));
    }
};

const actualizarReceptor = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const datosActualizados = req.body as receptoresDto;
        const response = await receptoresServices.actualizarReceptor(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'Receptor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Receptor actualizado correctamente', true));
        }
     } catch (ex) {
            res.status(500).send(IResponse(ex, 'Error actualizando receptor', false));
        }
    };

const eliminarReceptor = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await receptoresServices.eliminarReceptor(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Receptor no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'Receptor eliminado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando receptor', false));
    }
};

export default { obtenerTodosReceptores, crearReceptor, obtenerReceptorPorId, actualizarReceptor, eliminarReceptor};