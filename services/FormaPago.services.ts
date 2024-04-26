import { FormaPagoAtributos } from "../interfaces/models/FormaPago.interface";
import { FormaPagoDto } from "../interfaces/modelsDtos/FormaPagoDto";
import FormaPagoRepository from "../repositorys/FormaPago.repository";
import db from "../models";

const obtenerTodosFormaPago = async () => {
    try { 
      const FormaPago = await FormaPagoRepository.obtenerTodosFormaPago();
      return FormaPago;
    } catch (error) {
      throw new Error("Error al obtener metodoTipos");
    }
  };

const crearFormaPago = async (data: FormaPagoDto): Promise<any> => {
    try {
        const nuevoFormaPago:FormaPagoAtributos = {
            nombre: data.nombre,
            esta_activo: true
        };
        const response = await db.FormaPago.create(nuevoFormaPago);
        return response;
    } catch (error) {
        throw new Error("Error al crear el metodoTipos");
    }
};

const obtenerFormaPagoPorId = async (id: number): Promise<any> => {
    try {
        const FormaPago= await db.FormaPago.findByPk(id);
        return FormaPago;
    } catch (error) {
        throw new Error("Error al obtener el FormaPago");
    }
};

const actualizarFormaPago = async (id: number, datosActualizados: FormaPagoDto): Promise<any> => {
    try {
        const FormaPago = await db.FormaPago.findByPk(id);
        if (!FormaPago) {
            throw new Error("El metodoTipos no encontrado");
        }
        await FormaPago.update(datosActualizados);
        return FormaPago;
    } catch (error) {
        throw new Error("Error al actualizar el metodoTipos");
    }
};

const eliminarFormaPago = async (id: number): Promise<boolean> => {
    try {
        const FormaPago = await db.FormaPago.findByPk(id);
        if (!FormaPago) {
            throw new Error("El metodoTipos no encontrado");
        }
        await FormaPago.destroy();
        return true;
    } catch (error) {
        throw new Error("Error al eliminar el metodoTipos");
    }
};

export default {obtenerTodosFormaPago, crearFormaPago, obtenerFormaPagoPorId, actualizarFormaPago, eliminarFormaPago}
