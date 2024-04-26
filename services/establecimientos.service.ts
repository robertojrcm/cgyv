import establecimientosRepository from "../repositorys/establecimientos.repository";
import { establecimientoDto } from "../interfaces/modelsDtos/establecimientosDto";
import transaction from "sequelize/types/transaction";
import db from "../models";
import { solicitudEstablecimientoAtributos } from "../interfaces/models/solicitudEstablecimientos.interface";
import { solicitudEstablecimientosDto } from "../interfaces/modelsDtos/solicitudEstablecimientosDto";

const listarEstablecimientos = async () => {
    try {
        const establecimientos = await establecimientosRepository.listarEstablecimientos();
        return establecimientos;
    } catch (error) {
        throw new Error("Error al obtener establecimientos");
    }
};

const obtenerEstablecimientoPorId = async (id: number): Promise<any> => {
    try {
        const establecimiento = await establecimientosRepository.obtenerEstablecimientoPorId(id);
        return establecimiento;
    } catch (error) {
        throw new Error("Error al obtener establecimiento por id");
    }
};

const crearEstablecimiento = async (data: solicitudEstablecimientosDto, usuarioId: number): Promise<any> => {
    try {
        const response = await establecimientosRepository.crearEstablecimiento(data, usuarioId);
        return response;
    } catch (error) {
        throw error;
    }
};

const actualizarEstablecimiento = async (id: number, datosActualizados: any) => {
    try {
        const establecimiento = await establecimientosRepository.actualizarEstablecimiento(id, datosActualizados);
        return establecimiento;
    } catch (error) {
        throw error;
    }
};

const eliminarEstablecimiento = async (id: number) => {
    try {
        const response = await establecimientosRepository.eliminarEstablecimiento(id);
        return response;
    } catch (error) {
        throw error;
    }
};

const procesarSolicitud = async (id : number, aceptada : boolean) => {
    try {
        const response = await establecimientosRepository.procesarSolicitud(id, aceptada);
        return response;
    } catch (error) {
        throw error;
    }
};



export default { 
    listarEstablecimientos, 
    obtenerEstablecimientoPorId, 
    crearEstablecimiento, 
    actualizarEstablecimiento, 
    eliminarEstablecimiento, 
    procesarSolicitud 
}; 
