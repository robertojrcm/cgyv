import db from "../models";
import receptoresRepository from "../repositorys/receptores.repository";

const listarreceptores = async () => {
    try { 
      const receptores = await receptoresRepository.obtenerTodosReceptores();
        return receptores;
    } catch (error) {
      throw new Error("Error al obtener giros");
    }
  };

const obtenerReceptorPorId = async (id: number): Promise<any> => {
    try {
        const receptor = await receptoresRepository.obtenerReceptorPorId(id);
        if (!receptor) {
            throw new Error("Receptor no encontrado");
        }
        return receptor;
    } catch (error) {
        throw new Error("Error al obtener receptor por id");
    }
};

const crearReceptor = async (nuevoReceptor: any) => {
    try {
      const receptorCreado = await receptoresRepository.crearReceptor(nuevoReceptor);
      return receptorCreado;
    } catch (error) {
      throw new Error("Error al crear receptor");
    }
    };

const actualizarReceptor = async (id: number, datosActualizados: any) => {
    try {
      const receptorActualizado = await receptoresRepository.actualizarReceptor(id, datosActualizados);
      if (!receptorActualizado) {
        throw new Error("Receptor no encontrado");
      }
      await receptorActualizado.update(datosActualizados);
       return receptorActualizado;
    } catch (error) {
      throw new Error("Error al actualizar receptor");
    }
    };

const eliminarReceptor = async (id: number):Promise<boolean> => {
    try {
        const receptor = await db.Receptores.findByPk(id);
        if (!receptor) {
            throw new Error("Receptor no encontrado");
        }
        await receptor.destroy();
        return receptor;
    } catch (error) {
        throw new Error("Error al eliminar receptor");
    }
};

export default {listarreceptores , obtenerReceptorPorId, crearReceptor,actualizarReceptor ,eliminarReceptor};