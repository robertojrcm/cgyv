import db from "../models";
import { ReceptoresAtributos } from "../interfaces/models/receptores.interface";
import { receptoresDto } from "../interfaces/modelsDtos/receptoresDto"

const obtenerTodosReceptores = async () => {
    try{
        const receptores = await db.Receptores.findAll({
            where: { esta_activo: true }
        });
        return receptores; 
    } catch (error) {
        throw new Error("Error al obtener receptores");
    }};

const crearReceptor = async (data: receptoresDto): Promise<any> => {
    try {
        const nuevoReceptor: ReceptoresAtributos = {
            suscriptor_id: data.suscriptor_id,
            uso_cfdi_id: data.uso_cfdi_id,
            razon_social: data.razon_social,
            rfc: data.rfc,
            domicilio_fiscal: data.domicilio_fiscal,
            esta_activo: true
        };
        const response = await db.Receptores.create(nuevoReceptor);
        return response;
    } catch (error) {
        throw new Error("Error al crear el receptor");
    }
};

const obtenerReceptorPorId = async (id: number): Promise<any> => {
    try {
        const receptor = await db.Receptores.findByPk(id);
        return receptor;
    } catch (error) {
        throw new Error("Error al obtener el receptor");
    }
};

const actualizarReceptor = async (id: number, datosActualizados: receptoresDto): Promise<any> => {
    try {
        const receptor = await db.Receptores.findByPk(id);
        if (!receptor) {
            return null;
        }
        await receptor.update(datosActualizados);
        return receptor;
    } catch (error) {
        throw new Error("Error al actualizar el receptor");
    }
};

const eliminarReceptor = async (id: number): Promise<boolean> => {
    try {
        const receptor = await db.Receptores.findByPk(id);
        if (!receptor) {
            throw new Error("El receptor no encontrado");
        }
        await receptor.update({ esta_activo: false });
        return true;
    } catch (error) {
        throw new Error("Error al eliminar el receptor");
    }
};

export default {
    obtenerTodosReceptores,
    crearReceptor,
    obtenerReceptorPorId,
    actualizarReceptor,
    eliminarReceptor
}