import { inicioSesionAtributos } from "../interfaces/models/inicioSesion.interface";
import { inicioSesionDto } from "../interfaces/modelsDtos/inicioSesionDto";
import inicioSesionRepository from "../repositorys/inicioSesion.repository";
import db from "../models";

const crearinicioSesion = async (inicioSesion: inicioSesionDto):Promise<any>  => {
    try{
        const nuevoinicioSesion: inicioSesionAtributos = {
            token: inicioSesion.token,
            usuario_id: inicioSesion.usuario_id,
            dispositivo: inicioSesion.dispositivo,
            latitud: inicioSesion.latitud,
            longitud: inicioSesion.longitud,
            sesion_activa: inicioSesion.sesion_activa,
            sistema_operativo: inicioSesion.sistema_operativo,
            fecha_hora_inicio: inicioSesion.fecha_hora_inicio,
            fecha_hora_cierre: inicioSesion.fecha_hora_cierre
        };
        const response = await db.InicioSesion.create(nuevoinicioSesion);
        return response;
    } catch (error) {
        throw  error;
    }};

export default { crearinicioSesion };
