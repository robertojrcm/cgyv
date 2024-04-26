import { ingresosDto } from "../interfaces/modelsDtos/ingresosDto";
import { MetodoPagosDto } from "../interfaces/modelsDtos/metodoPagoDto";
import ingresosRepository from "../repositorys/ingresos.repository";

const listaringreso = async () => {
    try {
        const ingresos = await ingresosRepository.listaringreso();
        return ingresos; // Retorna los ingresos obtenidos
    } catch (error) {
        throw new Error("Error al obtener ingresos: "); // Lanza un nuevo error con un mensaje descriptivo
    }
};

// Método para crear un nuevo ingreso en la base de datos
const crearingreso = async (data: ingresosDto, metodoPagoData: MetodoPagosDto): Promise<any> => {
  try {
    // Lógica para crear el ingreso
    const ingresoCreado = await ingresosRepository.crearingreso(data, metodoPagoData);
    return ingresoCreado;
  } catch (error) {
    throw new Error("Error al crear el ingreso");
  }
};
// Método para obtener un ingreso por su ID
const obteneringreso = async (id: number): Promise<any> => {
  try{
    const ingreso = await ingresosRepository.obteneringresoPorId(id);
    if (!ingreso) {
      return null;
    }
    return ingreso;
  } catch (error) {
    throw error;
}};

// Método para actualizar un ingreso existente
const actualizaringreso = async (id: number, datosActualizados: ingresosDto): Promise<any> => {
  try{
    const ingresoActualizado = await ingresosRepository.actualizaringreso(id, datosActualizados);
    if (!ingresoActualizado) {
      return null;
    }
    await ingresoActualizado.update(datosActualizados);
    return ingresoActualizado;
  } catch (error) {
    throw error;    
}};

// Método para eliminar un ingreso por su ID
const eliminaringreso = async (id: number) => {
    try {
      const result = await ingresosRepository.eliminaringreso(id);
      if (!result) {
        throw new Error("ingreso no encontrado");
      }
      return result;
    } catch (error) {
      throw new Error("Error al eliminar el ingreso");
    }
  };

export default {listaringreso, crearingreso, obteneringreso, actualizaringreso, eliminaringreso };
