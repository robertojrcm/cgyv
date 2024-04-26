import { ingresosDto } from "../interfaces/modelsDtos/ingresosDto";
import { metodoPagosAtributos } from "../interfaces/models/metodoPagos.interface";
import db  from "../models";
import { ingresosAtributos } from "../interfaces/models/ingresos.interface";
import { Transaction } from "sequelize";

const listaringreso = async () => {
    try {
        const ingresos = await db.Ingresos.findAll({
            where: { esta_activo: true }
        });
        return ingresos;
    } catch (error) {
        throw new Error("Error al obtener ingresos");
    }
};

const crearingreso = async (data: ingresosDto , metodoPagoData: metodoPagosAtributos): Promise<any> => {
    const trans = await db.sequelize.transaction();
    try {
        const nuevoingreso: ingresosAtributos = {
            suscriptor_id: data.suscriptor_id,
            metodo_pago_id: data.metodo_pago_id,
            importe: data.importe,
            fecha_creacion: data.fecha_creacion,
            fecha_modificacion: data.fecha_modificacion,
            esta_activo: true
        };
    
        const response = await db.Ingresos.create(nuevoingreso, {Transaction:trans});

        const metodoPago = await db.MetodoPagos.findByPk(data.metodo_pago_id, { transaction:trans});
        if (!metodoPago) {
            throw new Error("Método de pago no encontrado");
        }

        // Convertir a número antes de la suma
        const saldo = parseFloat(metodoPago.saldo);
        const importe = parseFloat(String(data.importe)); // Convert to string before parsing as float

        if (isNaN(saldo) || isNaN(importe)) {
            throw new Error("El saldo inicial o el importe no son números válidos");
        }

        const nuevoSaldo = saldo + importe;
        await metodoPago.update({ saldo: nuevoSaldo } , {transaction:trans});

        await trans.commit();

        return response;
    } catch (error) {
        await trans.rollback();
        throw new Error("Error al crear el ingreso: " );
    }
};


// Método para obtener un gasto por su ID
const obteneringresoPorId = async (id: number): Promise<any> => {
    try {
        const ingreso = await db.Ingresos.findByPk(id);
        return ingreso;
    } catch (error) {
        throw new Error("Error al obtener el ingreso");
    }
};

// Método para actualizar un gasto existente
const actualizaringreso = async (id: number, datosActualizados: ingresosDto): Promise<any> => {
    try {
        const ingreso = await db.Ingresos.findByPk(id);
        if (!ingreso) {
           return null;
        }
        await ingreso.update(datosActualizados);
        return ingreso;
    } catch (error) {
       throw error;
    }
};

// Método para eliminar un gasto por su ID
const eliminaringreso = async (id: number): Promise<boolean> => {
    try {
        const ingreso = await db.Ingresos.findByPk(id);
        if (!ingreso) {
            throw new Error("El ingreso no encontrado");
        }
        await ingreso.destroy();
        return true;
    } catch (error) {
        throw new Error("Error al eliminar el ingreso");
    }
};

export default {listaringreso, crearingreso, obteneringresoPorId, actualizaringreso, eliminaringreso };
