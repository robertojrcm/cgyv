import db from "../models";
import { gastoCategoriaDto } from "../interfaces/modelsDtos/gastoCategoriaDto";

const obtenerTodosGastoCategorias = async () => {
    try {
      const gastoCategorias = await db.GastoCategoria.findAll({
        where: { esta_activo: true }
      });
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
    const response = await db.GastoCategoria.create(nuevoGastoCategoria);
    return response;
    } catch (error) {
        throw error;
    }};

const obtenerGastoCategoriaPorId = async (id: number): Promise<any> => {
  try {
    const gastoCategoria = await db.GastoCategoria.findByPk(id);
    return gastoCategoria;  
  } catch (error) {
    throw error;
  }
};

const actualizarGastoCategoria = async (id: number, datosActualizados: gastoCategoriaDto): Promise<any> => {
  try {
    const gastoCategoria = await db.GastoCategoria.findByPk(id);
    if (!gastoCategoria) {
      return null;
    }
    await gastoCategoria.update(datosActualizados);
    return gastoCategoria;
  } catch (error) {
    throw error;
  }};

const eliminarGastoCategoria = async (id: number): Promise<any> => {
  try {
    const gastoCategoria = await db.GastoCategoria.findByPk(id);
    if (!gastoCategoria) {
      throw new Error("Gasto categoria no encontrada");
    }
    await gastoCategoria.destroy({esta_activo: false});
    return gastoCategoria;
  } catch (error) {
    throw new Error("Error al eliminar gasto categoria");
  }};


export default {
    obtenerTodosGastoCategorias, crearGastoCategoria, obtenerGastoCategoriaPorId, actualizarGastoCategoria, eliminarGastoCategoria
}