import db from "../models";
import cfdiRepository from "../repositorys/cfdi.repository";

const listarcfdi = async () => {
    try { 
      const cfdi = await cfdiRepository.obtenerTodosCFDI();
        return cfdi;
    } catch (error) {
      throw new Error("Error al obtener cfdi");
    }
  };

  const obtenercfdiPorId = async (id: number): Promise<any> => {
    try {
        const cfdi = await cfdiRepository.obtenerCFDIPorId(id);
        if (!cfdi) {
            throw new Error("cfdi no encontrado");
        }
        return cfdi;
    } catch (error) {
        throw new Error("Error al obtener cfdi por id");
    
    }};

const crearcfdi = async (nuevocfdi: any) => {
    try {
      const cfdiCreado = await cfdiRepository.crearCFDI(nuevocfdi);
      return cfdiCreado;
    } catch (error) {
      throw new Error("Error al crear cfdi");
    }
    };

const actualizarcfdi = async (id: number, datosActualizados: any) => {
    try {
      const cfdiActualizado = await cfdiRepository.actualizarCFDI(id, datosActualizados);
      if (!cfdiActualizado) {
        throw new Error("cfdi no encontrado");
      }
      await cfdiActualizado.update(datosActualizados);
       return cfdiActualizado;
    } catch (error) {
      throw new Error("Error al actualizar cfdi");
    }
    };

const eliminarcfdi = async (id: number):Promise<boolean> => {
    try {
        const cfdi = await db.cfdi.findByPk(id);
        if (!cfdi) {
            throw new Error("cfdi no encontrado");
        }
        await cfdi.destroy();
        return cfdi;
    } catch (error) {
        throw new Error("Error al eliminar cfdi");
    }
};

export default {obtenercfdiPorId, listarcfdi, crearcfdi, actualizarcfdi, eliminarcfdi};