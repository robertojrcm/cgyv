import db from "../models";
import { cfdiDto } from "../interfaces/modelsDtos/cfdiDto";
import { cfdiAtributos } from "../interfaces/models/cfdi.interface";

const obtenerTodosCFDI = async () => {
    try {
        const cfdi = await db.cfdi.findAll();
        return cfdi;
    } catch (error) {
        throw new Error("Error al obtener CFDI");
    }
};

const crearCFDI = async (data: cfdiDto): Promise<any> => {
    try {
        const nuevoCFDI: cfdiAtributos = {
            gasto_id: data.gasto_id,
            emisor_id: data.emisor_id,
            receptor_id: data.receptor_id,
            metodo_pago_id: data.metodo_pago_id,
            uso_cfdi_id: data.uso_cfdi_id,
            importe_subtotal: data.importe_subtotal,
            importe_impuesto: data.importe_impuesto,
            importe_total: data.importe_total,
            fecha_emision: data.fecha_emision,
            ruta_archivo_xml: data.ruta_archivo_xml,
            ruta_archivo_pdf: data.ruta_archivo_pdf,
            cfdi_estatus_id: data.cfdi_estatus_id
        };
        const response = await db.cfdi.create(nuevoCFDI);
        return response;
    } catch (error) {
        throw new Error("Error al crear el CFDI");
    }
};

const obtenerCFDIPorId = async (id: number): Promise<any> => {
    try {
        const cfdi = await db.cfdi.findByPk(id);
        return cfdi;
    } catch (error) {
        throw new Error("Error al obtener el CFDI");
    }
};

const actualizarCFDI = async (id: number, data: cfdiDto): Promise<any> => {
    try	{
        const cfdi = await db.cfdi.findByPk(id);
        if (!cfdi) {
            throw new Error("El CFDI no encontrado");
        }
        await cfdi.update(data);
        return cfdi;
    } catch (error) {
        throw new Error("Error al actualizar el CFDI");
    }};

const eliminarCFDI = async (id: number): Promise<boolean> => {
    try {
        const cfdi = await db.cfdi.findByPk(id);
        if (!cfdi) {
            throw new Error("El CFDI no encontrado");
        }
        await cfdi.destroy();
        return true;
    } catch (error) {
        throw new Error("Error al eliminar el CFDI");
    }
};

export default { obtenerTodosCFDI, crearCFDI, obtenerCFDIPorId,actualizarCFDI, eliminarCFDI };

