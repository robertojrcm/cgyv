import { Request, Response } from 'express';
import ingresosService from '../services/ingresos.service';
import { ingresosDto } from '../interfaces/modelsDtos/ingresosDto';
import { MetodoPagosDto } from '../interfaces/modelsDtos/metodoPagoDto';
const IResponse = require("../utils/IResponse.handle");

const listaringreso = async (req: Request, res: Response) => {
    try {
        const response = await ingresosService.listaringreso();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo ingresos', false));
    }
}

const validarDatos = (data: any, criterios: { campo: string, obligatorio: boolean}[]): boolean => {
    for (const criterio of criterios) {
        if (criterio.obligatorio && !data[criterio.campo]) {
            return false; // Si falta un dato obligatorio, retornar falso
    }}
    return true; // Todos los criterios de validación pasaron
};
const crearingreso = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const data: ingresosDto = req.body;
        const metodoPagoData: MetodoPagosDto = req.body.metodoPagoData;

        // Definir criterios de validación
        const criteriosValidacion = [
            { campo: 'suscriptor_id', obligatorio: true },
            { campo: 'metodo_pago_id', obligatorio: false },
            { campo: 'importe', obligatorio: true },
            { campo: 'fecha_creacion', obligatorio: true },
            { campo: 'fecha_modificacion', obligatorio: true },
            { campo: 'esta_activo', obligatorio: true }
        ];

        // Validar los datos
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios o no cumplen con las restricciones', false));
            return;
        }

        // Llamar al servicio para crear el ingreso
        const response = await ingresosService.crearingreso(data, metodoPagoData);

        // Enviar respuesta al cliente
        res.status(200).send(IResponse(response, 'Ingreso creado correctamente', true));
    } catch (ex) {
        // Manejar errores
        res.status(500).send(IResponse(ex, 'Error creando ingreso', false));
    }
};

    
// Método para obtener un gasto por su ID
const obteneringreso = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await ingresosService.obteneringreso(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'ingreso no encontrado', false));
        } else {
            res.status(200).send(IResponse(response, '', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo ingreso', false));
    }
};

// Método para actualizar un gasto existente
const actualizaringreso = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const datosActualizados = req.body as ingresosDto;
        const response = await ingresosService.actualizaringreso(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'ingreso no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse(response, 'ingreso actualizado correctamente', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando ingreso', false));
    }
};

// Método para eliminar un gasto por su ID
const eliminaringreso = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await ingresosService.eliminaringreso(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'ingreso no encontrado', false));
            return;
        } else {
            res.status(200).send(IResponse({}, 'ingreso eliminado con éxito', true));
        }
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando ingreso', false));
    }
};

export default {listaringreso, crearingreso, obteneringreso, actualizaringreso, eliminaringreso };
