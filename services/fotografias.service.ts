import { FotografiasDto } from "../interfaces/modelsDtos/fotografiasDto";
import db from "../models";
import fotografiasRepository from "../repositorys/fotografias.repository";

const listaFotografias = async () => {
    try {
        const fotografias = await fotografiasRepository.obtenerTodasFotografias();
        return fotografias;
    } catch (error) {
        throw new Error("Error al obtener fotografias");
    }
};

const obtenerFotografiaPorId = async (id: number): Promise<any> => {
    try{
        const fotografia = await fotografiasRepository.obtenerFotografiaPorId(id);
        if (!fotografia) {
            throw new Error("Fotografia no encontrada");
        }
        return fotografia;
    } catch (error) {
        throw new Error("Error al obtener fotografia por id");
    }};

const crearFotografia = async (nuevaFotografia: any) => {
    try {
        const fotografiaCreada = await fotografiasRepository.crearFotografia(nuevaFotografia);
        return fotografiaCreada;
    } catch (error) {
        throw new Error("Error al crear fotografia");
    }
};

const actualizarFotografia = async (id: number, datosActualizados: FotografiasDto): Promise<any> => {
    try {
        const fotografiaActualizada = await  db.Fotografias.findByPk(id);
        if (!fotografiaActualizada) {
            throw new Error("Fotografia no encontrada");
        }
        await fotografiaActualizada.update(datosActualizados);
        return fotografiaActualizada;
    } catch (error) {
        throw new Error("Error al actualizar fotografia");
    }
};

const eliminarFotografia = async (id: number): Promise<boolean> => {
    try {
        const fotografia = await db.Fotografias.findByPk(id);
        if (!fotografia) {
            throw new Error("Fotografia no encontrada");
        }
        await fotografia.destroy();
        return true;
    } catch (error) {
        throw new Error("Error al eliminar fotografia");
    }
};

export default { listaFotografias, obtenerFotografiaPorId, crearFotografia, actualizarFotografia, eliminarFotografia };