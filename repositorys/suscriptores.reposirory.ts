import { CrearSuscriptorDto } from "../interfaces/modelsDtos/crearSuscriptores.interface";
import { suscriptoresAtributos } from "../interfaces/models/suscriptores.interface";
import db from "../models";
import { Sequelize, DataTypes } from 'sequelize';



const crearSuscriptor = async (data: CrearSuscriptorDto) => {

    const nuevoSuscriptor: suscriptoresAtributos = { 
        suscripcion_tipo_id : data.suscripcion_tipo_id ,
        usuario_id: data.usuario_id,
        sexo_id: data.sexo_id,
        nombres: data.nombres,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        telefono: data.telefono, 
        correo_electronico: data.correo_electronico
    };


    const response = await db.Suscriptores.create(nuevoSuscriptor);

return response;
};

export default {
    crearSuscriptor
}