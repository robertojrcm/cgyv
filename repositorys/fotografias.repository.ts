import db from "../models";
import { FotografiasAtributos } from "../interfaces/models/fotografias.interface";
import { FotografiasDto } from "../interfaces/modelsDtos/fotografiasDto";

const obtenerTodasFotografias = async () => {
    try {
        const fotografias = await db.Fotografias.findAll({
            where: { esta_activo: true }
        });
        return fotografias;
    } catch (error) {
        throw new Error("Error al obtener fotografias");
    }
};

const crearFotografia = async (data: FotografiasDto): Promise<any> => {
    try{
        const nuevaFotografia: FotografiasAtributos = {
            gasto_id: data.gasto_id,
            ruta_archivo: data.ruta_archivo,
            fecha_creacion: new Date(),
            esta_activo: true
        };
        const response = await db.Fotografias.create(nuevaFotografia);
            return response;
        } catch (error) {
            throw new Error("Error al crear la fotografia");
        }};

const obtenerFotografiaPorId = async (id: number): Promise<any> => {
    try {
        const fotografia = await db.Fotografias.findByPk(id);
        return fotografia;
    } catch (error) {
        throw new Error("Error al obtener la fotografia");
    }
};

const actualizarFotografia = async (id: number, datosActualizados: FotografiasDto): Promise<any> => {
    try {
        const fotografia = await db.Fotografias.findByPk(id);
        if (!fotografia) {
            return null;
        }
        await fotografia.update(datosActualizados);
        return fotografia;
    } catch (error) {
        throw new Error("Error al actualizar la fotografia");
    }
};

const eliminarFotografia = async (id: number): Promise<boolean> => {
    try {
        const fotografia = await db.Fotografias.findByPk(id);
        if (!fotografia) {
            throw new Error("La fotografia no encontrada");
        }
        await fotografia.update({ esta_activo: false });
        return true;
    } catch (error) {
        throw new Error("Error al eliminar la fotografia");
    }
};

export default { obtenerTodasFotografias, crearFotografia, obtenerFotografiaPorId, actualizarFotografia, eliminarFotografia };