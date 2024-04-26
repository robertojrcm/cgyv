import { CrearSuscriptorDto } from "../interfaces/modelsDtos/crearSuscriptores.interface";
import suscriptoresReposirory from "../repositorys/suscriptores.reposirory";

const crearSuscriptor = async (data: CrearSuscriptorDto) => {
    try{
        console.log(data)
        const response = await suscriptoresReposirory.crearSuscriptor(data);
        return response;
    }catch (error) {
        throw new Error("Error en el servicio: " + (error as Error).message);
    }
};

export default {crearSuscriptor}