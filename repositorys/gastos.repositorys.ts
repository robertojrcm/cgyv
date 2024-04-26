import { GastoDto } from "../interfaces/modelsDtos/GastoDto";
import { MetodoPagosDto } from "../interfaces/modelsDtos/metodoPagoDto";
import { GastoAtributos } from "../interfaces/models/gastos.interface";
import db from "../models";

const listarGasto = async () => {
    try {
        const gastos = await db.Gastos.findAll({
            where: { esta_activo: true }
        });
        return gastos;
    } catch (error) {
        throw new Error("Error al obtener gastos");
    }
};

const crearGasto = async (data: GastoDto, metodoPagoData: MetodoPagosDto): Promise<any> => {
    const trans = await db.sequelize.transaction();
    try {
        const nuevoGasto: GastoAtributos = {
            suscriptor_id: data.suscriptor_id,
            presupuesto_id: data.presupuesto_id,
            gasto_categoria_id: data.gasto_categoria_id,
            establecimiento_id: data.establecimiento_id,
            metodo_pago_id: data.metodo_pago_id,
            importe: data.importe,
            descripcion: data.descripcion,
            latitud: data.latitud,
            longitud: data.longitud,
            fecha_creacion: data.fecha_creacion,
            fecha_modificacion: data.fecha_modificacion,
            es_facturable: data.es_facturable,
            es_reembolsable: data.es_reembolsable,
            esta_activo: true
        };

        // Crear el nuevo gasto en la base de datos
        const response = await db.Gastos.create(nuevoGasto, { transaction: trans });

        // Obtener el método de pago
        const metodoPago = await db.MetodoPagos.findByPk(data.metodo_pago_id, { transaction: trans });

        if (!metodoPago) {
            throw new Error("Método de pago no encontrado");
        }

        // Convertir a número antes de la resta
        const saldo = parseFloat(metodoPago.saldo);
        const importe = parseFloat(String(data.importe));

        if (isNaN(saldo) || isNaN(importe)) {
            throw new Error("Saldo o importe no válido");
        }

        // Actualizar el saldo inicial del método de pago
        const nuevoSaldo = saldo - importe;

        await metodoPago.update({ saldo: nuevoSaldo }, { transaction: trans });

        await trans.commit();

        return response;
    } catch (error) {
        await trans.rollback();
        throw new Error("Error al crear el gasto");
    }
};




// Método para obtener un gasto por su ID
const obtenerGastoPorId = async (id: number): Promise<any> => {
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
            throw new Error("Gasto no encontrado");
        }
        await gasto.destroy();
        return gasto;
    } catch (error) {
        throw new Error("Error al eliminar gasto");
    }
};

export default {  listarGasto, crearGasto, obtenerGastoPorId, actualizarGasto, eliminarGasto };
