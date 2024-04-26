import db from "../models";
import { establecimientoDto } from "../interfaces/modelsDtos/establecimientosDto";
import { establecimientosAtributos } from "../interfaces/models/establecimientos.interface";
import { Sequelize } from "sequelize";
import SolicitudDatos from "../models/cargainicial/solicitudEstatus";
import { solicitudEstablecimientoAtributos } from "../interfaces/models/solicitudEstablecimientos.interface";
 

const listarEstablecimientos = async () => {
    try {
        const establecimientos = await db.Establecimientos.findAll({
            where: { esta_activo: true }
        });
        return establecimientos;
    } catch (error) {
        throw new Error("Error al obtener establecimientos");
    }
};


const crearEstablecimiento = async (data: solicitudEstablecimientoAtributos, usuarioId: number): Promise<any> => {
    const transaction = await db.sequelize.transaction();
    try {
        // Omitir establecimiento_id al crear la solicitud
        const solicitud = await db.SolicitudEstablecimientos.create({
            giro_id: data.giro_id,
            ciudad_id: data.ciudad_id,
            establecimiento_id: data.establecimiento_id,
            nombre: data.nombre,
            direccion: data.direccion,
            latitud: data.latitud,
            longitud: data.longitud,
            telefono: data.telefono,
            correo_electronico: data.correo_electronico,
            url: data.url,
            usuario_creador_id: usuarioId,
            usuario_autorizador_id: data.usuario_autorizador_id, // Aún no hay un autorizador asignado
            fecha_creacion: new Date(),
            fecha_modificacion: new Date(),
            solicitud_estatus_id: 1 // Estado inicial de la solicitud (por ejemplo, pendiente)
        }, { transaction });

        // Confirmar la transacción después de crear la solicitud
        await transaction.commit();

        // Devolver la solicitud creada para su posterior procesamiento o notificación
        return solicitud;
    } catch (error) {
        // Si ocurre un error, realiza un rollback de la transacción y lanza el error
        await transaction.rollback();
        throw error;
    }
};





const obtenerEstablecimientoPorId = async (Id: number) => {
    try {
        const establecimiento = await db.Establecimientos.findByPk(Id);
        return establecimiento;
    } catch (error) {
        throw new Error("Error al obtener establecimiento por id");
    }
};


const actualizarEstablecimiento = async (id: number, datosActualizados: establecimientoDto): Promise<any> => {
    try {
        const establecimiento = await db.Establecimientos.findByPk(id);
        if (!establecimiento) {
            throw new Error("Establecimiento no encontrado");
        }
        await establecimiento.update(datosActualizados);
        return establecimiento;
    } catch (error) {
        throw error;
    }
};

const eliminarEstablecimiento = async (Id: number): Promise<boolean> => {
    try {
        const establecimiento = await db.Establecimientos.findByPk(Id);
        if (!establecimiento) {
            throw new Error("Establecimiento no encontrado");
        }
        await establecimiento.destroy();
        return establecimiento;
    } catch (error) {
        throw error;
    }
};

const procesarSolicitud = async (id :number , aceptada: boolean) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Buscar la solicitud por su ID
        const solicitud = await db.SolicitudEstablecimientos.findByPk(id, { transaction });
        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }

        // Actualizar el estado de la solicitud
        solicitud.solicitud_estatus_id = aceptada ? 2 : 3; // 2 para aceptada, 3 para rechazada
        await solicitud.save({ transaction });

        // Si la solicitud es aceptada, crear el establecimiento
        if (aceptada) {
            // Crear el establecimiento con los datos de la solicitud
            await db.Establecimientos.create({
                giro_id: solicitud.giro_id,
                ciudad_id: solicitud.ciudad_id,
                nombre: solicitud.nombre,
                direccion: solicitud.direccion,
                latitud: solicitud.latitud,
                longitud: solicitud.longitud,
                telefono: solicitud.telefono,
                correo_electronico: solicitud.correo_electronico,
                url: solicitud.url,
                esta_activo: true // Establecimiento activo
            }, { transaction });
        }

        // Commit la transacción
        await transaction.commit();

        // Devolver la solicitud actualizada
        return solicitud;
    } catch (error) {
        // Si ocurre un error, realizar rollback de la transacción y lanzar el error
        await transaction.rollback();
        throw error;
    }
};



export default { listarEstablecimientos, crearEstablecimiento, obtenerEstablecimientoPorId, actualizarEstablecimiento, eliminarEstablecimiento, procesarSolicitud };