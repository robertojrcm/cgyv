
import { CrearUsuarioDto } from "../interfaces/modelsDtos/crearUsuarioDto.interface";
import suscriptoresReposirory from "../repositorys/suscriptores.reposirory";

import usuariosRepository from "../repositorys/usuarios.repository";


const crearUsuario = async (data: CrearUsuarioDto) => {
    try{
        console.log(data)
        const response = await usuariosRepository.crearUsuario(data);

        return response;
    }catch (error) {
        throw  error ;
    }
};

export default {crearUsuario} 
