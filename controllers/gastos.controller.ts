import { Request, Response } from 'express';
import gastosService from "../services/gastos.service";
import { GastoDto } from "../interfaces/modelsDtos/GastoDto";
import { MetodoPagosDto } from '../interfaces/modelsDtos/metodoPagoDto';
const IResponse = require("../utils/IResponse.handle");
import db from '../models';

const listarGasto = async (req: Request, res: Response) => {
    try {
        const response = await gastosService.listarGasto();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo gastos', false));
    }
}


const validarDatos = (data: any, criterios: { campo: string, obligatorio: boolean, minCaracteres?: number, maxCaracteres?: number }[]): boolean => {
    for (const criterio of criterios) {
        if (criterio.obligatorio && !data[criterio.campo]) {
            return false; // Si falta un dato obligatorio, retornar falso
        }

        if (typeof data[criterio.campo] !== 'boolean' && typeof data[criterio.campo] !== 'undefined') {
            if (criterio.minCaracteres && data[criterio.campo].length < criterio.minCaracteres) {
                return false; // Si la longitud es menor que el mínimo, retornar falso
            }

            if (criterio.maxCaracteres && data[criterio.campo].length > criterio.maxCaracteres) {
                return false; // Si la longitud es mayor que el máximo, retornar falso
            }
        }
    }
    return true; // Todos los criterios de validación pasaron
};

const crearGasto = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: GastoDto = req.body;
        const metodoPagoData: MetodoPagosDto = req.body.metodoPagoData;


        const criteriosValidacion = [
        { campo: 'suscriptor_id', obligatorio: true },
        { campo: 'presupuesto_id', obligatorio: false },
        { campo: 'gasto_categoria_id', obligatorio: false },
        { campo: 'establecimiento_id', obligatorio: false },
        { campo: 'metodo_pago_id', obligatorio: false },
        { campo: 'importe', obligatorio: true },
        { campo: 'descripcion', obligatorio: false, minCaracteres: 1, maxCaracteres: 100 }, // Ejemplo de validación de longitud para descripción
        { campo: 'latitud', obligatorio: true },
        { campo: 'longitud', obligatorio: true },
        { campo: 'es_facturable', obligatorio: false },
        { campo: 'es_reembolsable', obligatorio: false },
        { campo: 'fecha_creacion', obligatorio: true }
        ];
        
       
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios o no cumplen con las restricciones', false));
            return;
        }

        // Llamar al servicio para crear el gasto
        const response = await gastosService.crearGasto(data, metodoPagoData);

        // Enviar respuesta al cliente
        res.status(200).send(IResponse(response, 'Gasto creado correctamente', true));
    } catch (ex) {
        // Manejar errores
        res.status(500).send(IResponse(ex, 'Error creando gasto', false));
    }
};

    
// Método para obtener un gasto por su ID
const obtenerGasto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await gastosService.obtenerGasto(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Gasto no encontrado', false));
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo gasto', false));
    }
};

// Método para actualizar un gasto existente
const actualizarGasto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const datosActualizados = req.body as GastoDto;
        const response = await gastosService.actualizarGasto(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'Gasto no encontrado', false));
        } else {
            res.status(200).send(IResponse(response, 'Gasto actualizado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando gasto', false));
    }
};

// Método para eliminar un gasto por su ID
const eliminarGasto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await gastosService.eliminarGasto(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Gasto no encontrado', false));
        } else {
            res.status(200).send(IResponse({}, 'Gasto eliminado con éxito', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando gasto', false));
    }
};

export default {listarGasto, crearGasto, obtenerGasto, actualizarGasto, eliminarGasto };
