
import suscriptorTiposRepository from "../repositorys/suscriptorTipos.repository";

const obtenersuscriptorTipos = async () => {
    const response = await suscriptorTiposRepository.obtenersuscriptorTipos()
    return response;
  };

export default {obtenersuscriptorTipos}