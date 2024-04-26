import { Request, Response } from "express";
import establecimientosService from "../services/establecimientos.service";
const IResponse = require("../utils/IResponse.handle");
import { establecimientoDto } from "../interfaces/modelsDtos/establecimientosDto";
import girosDatos from "../models/cargainicial/giros";
import { solicitudEstablecimientosDto } from "../interfaces/modelsDtos/solicitudEstablecimientosDto";
import { solicitudEstablecimientoAtributos } from "../interfaces/models/solicitudEstablecimientos.interface";

const listarEstablecimientos = async (req: Request, res: Response) => { 
    try {
        const response = await establecimientosService.listarEstablecimientos();
        res.status(200).send(IResponse(response, '', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo establecimientos', false));
    }
    };

const obtenerEstablecimientoPorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); 
        const response = await establecimientosService.obtenerEstablecimientoPorId(id); 
        if (!response) {
            res.status(404).send(IResponse(null, 'Establecimiento no encontrado', false));
        } else {
        res.status(200).send(IResponse(response, '', true));
    } 
     }catch (ex) {
        res.status(500).send(IResponse(ex, 'Error obteniendo establecimiento', false));
    }
};

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

const CrearEstablecimiento = async (req: Request, res: Response) => {
    try {
        const data: solicitudEstablecimientosDto = req.body;
        const usuarioid: number = req.body.usuario_creador_id;
        const criteriosValidacion = [
            { campo: 'giro_id', obligatorio: true },
            { campo: 'ciudad_id', obligatorio: true },
            { campo: 'establecimiento_id', obligatorio: false},
            { campo: 'nombre', obligatorio: true },
            { campo: 'direccion', obligatorio: true },
            { campo: 'latitud', obligatorio: true },
            { campo: 'longitud', obligatorio: true },
            { campo: 'telefono', obligatorio: false },
            { campo: 'correo_electronico', obligatorio: false },
            { campo: 'url', obligatorio: false },
            { campo: 'usuario_creador_id', obligatorio: true }, // Añadir validación para usuario_creador_id
            { campo: 'usuario_autorizador_id', obligatorio: false  }, // Añadir validación para usuario_autorizador_id
            { campo: 'fecha_creacion', obligatorio: true }, // Añadir validación para fecha_creacion
            { campo: 'fecha_modificacion', obligatorio: false }, // Añadir validación para fecha_modificacion
            { campo: 'solicitud_estatus_id', obligatorio: false } // Añadir validación para solicitud_estatus_id
        ];
        if (!validarDatos(data, criteriosValidacion)) {
            res.status(400).send(IResponse(null, 'Faltan datos obligatorios', false));
            return;
        }
        const response = await establecimientosService.crearEstablecimiento(data, usuarioid);
        res.status(200).send(IResponse(response, 'Solicitud de establecimiento creada con éxito', true));
    } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error creando solicitud de establecimiento', false));
    }
};


 

const actualizarEstablecimiento = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const datosActualizados = req.body as establecimientoDto;
        const response = await establecimientosService.actualizarEstablecimiento(id, datosActualizados);
        if (!response) {
            res.status(404).send(IResponse(null, 'Establecimiento no encontrado', false));
        } else {
        res.status(200).send(IResponse(response, 'Establecimiento actualizado con éxito', true));
    }
 } catch (ex) {
        res.status(500).send(IResponse(ex, 'Error actualizando establecimiento', false));
    
}};

const eliminarEstablecimiento = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const response = await establecimientosService.eliminarEstablecimiento(id);
        if (!response) {
            res.status(404).send(IResponse(null, 'Establecimiento no encontrado', false));
        } else {
        res.status(200).send(IResponse(response, 'Establecimiento eliminado con éxito', true));
    } 
}catch (ex) {
        res.status(500).send(IResponse(ex, 'Error eliminando establecimiento', false));
    }
};

const procesarSolicitud = async (req: Request, res: Response) => {
    try {
        const { id, aceptada } = req.body;

        // Llamar al servicio para procesar la solicitud
        const response = await establecimientosService.procesarSolicitud(id, aceptada);

        if (aceptada) {
            res.status(200).json({ message: 'Solicitud aceptada correctamente', solicitud: response });
        } else {
            res.status(200).json({ message: 'Solicitud rechazada correctamente', solicitud: response });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error procesando la solicitud'});
    }
};




export default { listarEstablecimientos,obtenerEstablecimientoPorId , CrearEstablecimiento, eliminarEstablecimiento, actualizarEstablecimiento, procesarSolicitud };