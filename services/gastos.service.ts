import { GastoDto } from "../interfaces/modelsDtos/GastoDto";
import db from "../models";
import { GastoAtributos } from "../interfaces/models/gastos.interface";
import gastosRepositorys from "../repositorys/gastos.repositorys";
import { MetodoPagosDto } from "../interfaces/modelsDtos/metodoPagoDto";

const listarGasto = async () => {
    try { 
        const gastos = await gastosRepositorys.listarGasto();
        return gastos; // Asegúrate de retornar los gastos aquí
    } catch (error) {
        throw new Error("Error al obtener gastos");
    }
};


// Método para crear un nuevo gasto en la base de datos
const crearGasto = async (data: GastoDto, metodoPagoData: MetodoPagosDto): Promise<any> => {
    try {
        const gastoCreado = await gastosRepositorys.crearGasto(data, metodoPagoData);
        return gastoCreado;
    } catch (error) {
        throw error;
    }
};

// Método para obtener un gasto por su ID
const obtenerGasto = async (id: number): Promise<any> => {
    try {
        const gasto = await db.Gastos.findByPk(id);
        return gasto;
    } catch (error) {
        throw error;
    }
};

// Método para actualizar un gasto existente
const actualizarGasto = async (id: number, datosActualizados: GastoDto): Promise<any> => {
    try {
        const gasto = await db.Gastos.findByPk(id);
        if (!gasto) {
            return null;
        }
        await gasto.update(datosActualizados);
        return gasto;
    } catch (error) {
        throw error;
    }
};

// Método para eliminar un gasto por su ID
const eliminarGasto = async (id: number): Promise<boolean> => {
    try {
        const gasto = await db.Gastos.findByPk(id);
        if (!gasto) {
            return false;
        }
        await gasto.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};

export default {listarGasto, crearGasto, obtenerGasto, actualizarGasto, eliminarGasto };
