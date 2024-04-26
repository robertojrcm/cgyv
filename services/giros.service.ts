import girosRepository from "../repositorys/giros.repository";

const listarGiros = async () => {
    try { 
      const giros = await girosRepository.listarGiros();
        return giros;
    } catch (error) {
      throw new Error("Error al obtener giros");
    }

  };

  const obtenerGiroPorId = async (id: number): Promise<any> => {
    try {
        const giro = await girosRepository.obtenerGiroPorId(id);
        if (!giro) {
            throw new Error("Giro no encontrado");
        }
        return giro;
    } catch (error) {
        throw new Error("Error al obtener giro por id");
    }
}

const creargiro = async (nuevoGiro: any) => {
   try {
     const giroCreado = await girosRepository.crearGiro(nuevoGiro);
     return giroCreado;
   } catch (error) {
     throw new Error("Error al crear giro");
   }
};

const actualizarGiro = async (id: number, datosActualizados: any) => {
  try {
    const giroActualizado = await girosRepository.actualizarGiro(id, datosActualizados);
    if (!giroActualizado) {
      throw new Error("Giro no encontrado");
    }
    await giroActualizado.update(datosActualizados);
     return giroActualizado;
  } catch (error) {
    throw new Error("Error al actualizar giro");
  }
};

 const eliminarGiro = async (id: number) => {
  try {
    const giro = await girosRepository.eliminarGiro(id);
  if (!giro) {
      throw new Error("Giro no encontrado");
  }
  await giro.destroy();
  return giro;
} catch (error) {
  throw new Error("Error al eliminar giro");
}
 };
export default {listarGiros , obtenerGiroPorId, creargiro,actualizarGiro ,eliminarGiro};