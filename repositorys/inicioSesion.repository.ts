import db from "../models";
import { inicioSesionAtributos } from "../interfaces/models/inicioSesion.interface";
import { inicioSesionDto } from "../interfaces/modelsDtos/inicioSesionDto";

const crearinicioSesion = async (inicioSesionData: inicioSesionDto): Promise<any> => {
    try {
        const nuevoinicioSesion: inicioSesionAtributos = {
            token: inicioSesionData.token,
            usuario_id: inicioSesionData.usuario_id,
            dispositivo: inicioSesionData.dispositivo,
            latitud: inicioSesionData.latitud,
            longitud: inicioSesionData.longitud,
            sesion_activa: inicioSesionData.sesion_activa,
            sistema_operativo: inicioSesionData.sistema_operativo,
            fecha_hora_inicio: inicioSesionData.fecha_hora_inicio,
            fecha_hora_cierre: inicioSesionData.fecha_hora_cierre
        }; 
        const response = await db.InicioSesion.create(nuevoinicioSesion);
        return response;
    } catch (error) {
        throw new Error("Error al crear el inicioSesion: ");
    }
};

export default { crearinicioSesion};
