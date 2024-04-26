import { Sequelize } from 'sequelize';
import db from "../../models";

class ciudadDatos {
    static async seed() {
        console.log("Cargando datos");

        const ciudades = [
            { id: 1, estado_id: 25 ,nombre: "Cuiliacan" },
            { id: 2, estado_id: 25 ,nombre: "Mazatlan" },
            { id: 3, estado_id: 10 ,nombre: "Victoria Durango" },   
        ];
        

        try {
            for (const ciudad of ciudades) {
                // Intenta encontrar o crear el tipo de método
                const [instance, created] = await db.Ciudades.findOrCreate({
                    where: { id: ciudad.id },
                    defaults: ciudad
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en ciudades: ", error);
        }     
    }
}

export default ciudadDatos ;