import { response } from "express";
import db from "../models";
import Giros from "../models/giros";
import { GirosDto } from "../interfaces/modelsDtos/Giros.Dto";

const listarGiros = async () => {
    try {
        const giros = await db.Giros.findAll({
            where: { esta_activo: true } 
        });
        return giros;
    } catch (error) {
        throw new Error("Error al obtener giros");
    }
};


const crearGiro = async (nuevoGiroData: typeof Giros) => {
    try{
        const nuevoGiro = await Giros.create(nuevoGiroData);
        return nuevoGiro;
    } catch (error) {
        throw new Error("Error al crear giro");
    }
};

const obtenerGiroPorId = async (giroId: number) => {
        const response = await db.Giros.findByPk(giroId);
        if (!response) {
                throw new Error("Giro no encontrado");
        }
        return response;
};

const actualizarGiro = async (id: Number, datosActualizados: GirosDto)  => {
   try {
     const giro = await db.Giros.findByPk(id);
        if (!giro) {
        throw new Error("Giro no encontrado");
        }
        await giro.update(datosActualizados);
        return giro;
   }  catch (error) {
    throw new Error("Error al actualizar giro");
   }
};

const eliminarGiro = async (Id: number) => {
  try {
    const giro = await db.Giros.findByPk(Id);
    if (!giro) {
        throw new Error("Giro no encontrado");
    }
    await giro.destroy();
    return giro;
    } catch (error) {
        throw new Error("Error al eliminar giro");
  }    
};

export default {
    listarGiros,
    crearGiro,
    obtenerGiroPorId,
    actualizarGiro,
    eliminarGiro
};