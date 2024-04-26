import db from "../models";

const obtenersuscriptorTipos = async () => {
    const response = await db.SuscripcionTipos.findAndCountAll({
     where: { esta_activo: true } 
     } );
  
    return response;
  };

export default {
    obtenersuscriptorTipos
}