import { usuarioAtributos } from "../interfaces/models/usuarios.interface";
import { CrearUsuarioDto } from "../interfaces/modelsDtos/crearUsuarioDto.interface";
import { suscriptoresAtributos } from "../interfaces/models/suscriptores.interface";
import db from "../models";
import { Transaction } from "sequelize";



const crearUsuario = async (data: CrearUsuarioDto) => {
    const trans = await db.sequelize.transaction();
    try {
        const telefonoExistente = await db.Suscriptores.findAndCountAll({
            where: {
                telefono: data.telefono
            }
        });
        // verificar si el telefono ya existe
        if (telefonoExistente.count > 0) {
            await trans.rollback();
            throw new Error("El número de teléfono ya está registrado.");
        }
        // verificar si el telefono tiene 10 digitos
        if (data.telefono.length !== 10) {
            await trans.rollback();
            throw new Error("El número de teléfono debe tener 10 dígitos.");
       }
       // verificar si el correo electronico es valido
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(data.correo_electronico)) {
        await trans.rollback();
        throw new Error("El correo electrónico no es válido.");
       }

        const nuevoUsuario = await db.Usuarios.create({  
            usuario: data.usuario,
            contrasena: data.contrasena,
        }, { transaction: trans });

        const nuevoSuscriptor = await db.Suscriptores.create({
            suscripcion_tipo_id: data.suscripcion_tipo_id,
            usuario_id: nuevoUsuario.id,
            sexo_id: data.sexo_id,
            nombres: data.nombres,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            telefono: data.telefono,
            correo_electronico: data.correo_electronico
        }, { transaction: trans });

        await db.MetodoPagos.create({
            suscriptor_id: nuevoSuscriptor.id,
            forma_pago_id: 1,
            descripcion: "Billetera",
            saldo_inicial: 0, // Corregir el nombre del campo
            esta_activo: true,
            
        }, { transaction: trans });

        await trans.commit();

        return nuevoSuscriptor;
    } catch (error) {
        await trans.rollback();
        throw new Error("Error al crear el usuario: " ); // Propagar el mensaje de error para facilitar la depuración
    }
};

 
export default {  
    crearUsuario
}