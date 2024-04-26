import db from "../models";
import emisoresRepository from "../repositorys/emisores.repository";
 
const listaemisor = async () => {
    try { 
      const emisores = await emisoresRepository.obtenerTodosEmisores();
        return emisores;
    } catch (error) {
      throw new Error("Error al obtener emisor");
    }
  };

  const obteneremisorPorId = async (id: number): Promise<any> => {
    try {
        const emisor = await emisoresRepository.obtenerEmisorPorId(id);
        if (!emisor) {
            throw new Error("emisor no encontrado");
        }
        return emisor;
    } catch (error) {
        throw new Error("Error al obtener emisor por id");
    
    }};

const crearemisor = async (nuevoEmisor: any) => {
    try {
      const emisorCreado = await emisoresRepository.crearEmisor(nuevoEmisor);
      return emisorCreado;
    } catch (error) {
      throw new Error("Error al crear emisor");
    }
    };

const actualizaremisor = async (id: number, datosActualizados: any) => {
    try {
      const emisorActualizado = await emisoresRepository.actualizarEmisor(id, datosActualizados);
      if (!emisorActualizado) {
        throw new Error("emisor no encontrado");
      }
      await emisorActualizado.update(datosActualizados);
       return emisorActualizado;
    } catch (error) {
      throw new Error("Error al actualizar emisor");
    }
    };

const eliminaremisor = async (id: number):Promise<boolean> => {
    try {
        const emisor = await db.Emisores.findByPk(id);
        if (!emisor) {
            throw new Error("emisor no encontrado");
        }
        await emisor.destroy();
        return emisor;
    } catch (error) {
        throw new Error("Error al eliminar emisor");
    }
};

export default {listaemisor , obteneremisorPorId, crearemisor,actualizaremisor ,eliminaremisor};