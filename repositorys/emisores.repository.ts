import db from '../models';
import { emisoresAtributos } from '../interfaces/models/emisores.interface';
import { emisoresDto } from '../interfaces/modelsDtos/emisoresDto';

const obtenerTodosEmisores = async () => {
    try {
        const emisores = await db.Emisores.findAll({
            where: { esta_activo: true }
        });
        return emisores;
    } catch (error) {
        throw new Error("Error al obtener emisores");
    }
};

const crearEmisor = async (data: emisoresDto): Promise<any> => {
    try {
        const nuevoEmisor: emisoresAtributos = {
            establecimiento_id: data.establecimiento_id,
            rfc: data.rfc,
            razon_social: data.razon_social,
            domicilio_fiscal: data.domicilio_fiscal,
            esta_activo: true
        };
        const response = await db.Emisores.create(nuevoEmisor);
        return response;
    } catch (error) {
        throw new Error("Error al crear el emisor");
    }
};

const obtenerEmisorPorId = async (id: number): Promise<any> => {
    try {
        const emisor = await db.Emisores.findByPk(id);
        return emisor;
    } catch (error) {
        throw new Error("Error al obtener el emisor");
    }
};

const actualizarEmisor = async (id: number, datosActualizados: emisoresDto): Promise<any> => {
    try {
        const emisor = await db.Emisores.findByPk(id);
        if (!emisor) {
            return null;
        }
        await emisor.update(datosActualizados);
        return emisor;
    } catch (error) {
        throw new Error("Error al actualizar el emisor");
    }
};

const eliminarEmisor = async (id: number): Promise<boolean> => {
    try {
        const emisor = await db.Emisores.findByPk(id);
        if (!emisor) {
            throw new Error("El emisor no encontrado");
        }
        await emisor.update({ esta_activo: false });
        return true;
    } catch (error) {
        throw new Error("Error al eliminar el emisor");
    }
};

export default { obtenerTodosEmisores, crearEmisor, obtenerEmisorPorId, actualizarEmisor, eliminarEmisor };