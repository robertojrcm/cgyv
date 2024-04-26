import { cfdiDto } from "../interfaces/modelsDtos/cfdiDto";
const IResponse = require("../utils/IResponse.handle");
import cfdiServices from "../services/cfdi.service";
import { Request, Response } from "express";

const obtenerTodosCFDI = async (req: Request, res: Response) => {
    try {
        const response = await cfdiServices.listarcfdi();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo todos los CFDI', false));
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

const crearCFDI = async (req: Request, res: Response) => {
    try {
        const data: cfdiDto = req.body;
        const criteriosValidacion = [
            { campo: 'gasto_id', obligatorio: true },
            { campo: 'emisor_id', obligatorio: true },
            { campo: 'receptor_id', obligatorio: true },
            { campo: 'metodo_pago_id', obligatorio: true },
            { campo: 'uso_cfdi_id', obligatorio: true },
            { campo: 'importe_subtotal', obligatorio: true },
            { campo: 'importe_impuesto', obligatorio: true },
            { campo: 'importe_total', obligatorio: true },
            { campo: 'fecha_emision', obligatorio: true },
            { campo: 'ruta_archivo_xml', obligatorio: true },
            { campo: 'ruta_archivo_pdf', obligatorio: true },
            { campo: 'cfdi_estatus_id', obligatorio: true }
        ];
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios', false));
            return;
        }
        const response = await cfdiServices.crearcfdi(data);
        res.status(201).send(IResponse(response, 'CFDI creado correctamente', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error creando CFDI', false));
    }};

const obtenerCFDIPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await cfdiServices.obtenercfdiPorId(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'CFDI no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo CFDI', false));
    } };

const actualizarCFDI = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const datosActualizados = req.body as cfdiDto;
        const response = await cfdiServices.actualizarcfdi(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'CFDI no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'CFDI actualizado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando CFDI', false));
    }};

const eliminarCFDI = async (req: Request, res: Response) => {
 try {
    const id = Number(req.params.id);
    const response = await cfdiServices.eliminarcfdi(id);
    if (!response) {
        res.status(404).send(IResponse(null, 'CFDI no encontrado', false));
        return;
    } else {
        res.status(200).send(IResponse(response, 'CFDI eliminado correctamente', true));
    }
} catch (ex) {
    res.status(500).send(IResponse(ex, 'Error eliminando CFDI', false));
}
}; 

export default {obtenerTodosCFDI, crearCFDI, obtenerCFDIPorId, actualizarCFDI, eliminarCFDI};
    