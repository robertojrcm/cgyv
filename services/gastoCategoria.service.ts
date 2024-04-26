
import gastoCategoriaRepository from "../repositorys/gastoCategoria.repository";
import { gastoCategoriaDto } from "../interfaces/modelsDtos/gastoCategoriaDto";
import db from "../models";

 const obtenerTodosGastoCategorias = async () => {
  try {
    const gastoCategorias = await gastoCategoriaRepository.obtenerTodosGastoCategorias();
    return gastoCategorias;
  } catch (error) {
    throw new Error("Error al obtener gasto categorias");
  }};

const crearGastoCategoria = async (data: gastoCategoriaDto): Promise<any> => {
  try {
    const nuevoGastoCategoria = {
      nombre: data.nombre,
      icono_url: data.icono_url,
      esta_activo: true
  };
  const response = await gastoCategoriaRepository.crearGastoCategoria(nuevoGastoCategoria);
  return response;
  } catch (error) {
      throw error;
  }};

  async function obtenerGastoCategoriaPorId(id: number): Promise<any> {
  try {
    const gastoCategoria = await gastoCategoriaRepository.obtenerGastoCategoriaPorId(id);
    return gastoCategoria;
  } catch (error) {
    throw error;
  }
}

    const actualizarGastoCategoria = async (id: number, datosActualizados: gastoCategoriaDto): Promise<any> => {
      try {
        const gastoCategoria = await db.GastoCategoria.findByPk(id);
        if (!gastoCategoria) {
          return null;
        }
        await gastoCategoria.update(datosActualizados);
      } catch (error) {
        throw error;
      }};

      const eliminarGastoCategoria = async (id: number): Promise<any> => {
        try {
          const gastoCategoria = await db.GastoCategoria.findByPk(id);
          if (!gastoCategoria) {
            throw new Error("Gasto categoria no encontrada");
          }
          await gastoCategoria.destroy();
          return true;
        } catch (error) {
          throw error;
        }}; 


export default {obtenerTodosGastoCategorias, crearGastoCategoria, obtenerGastoCategoriaPorId, actualizarGastoCategoria, eliminarGastoCategoria}