import { Sequelize } from 'sequelize';
import db from "../../models";

class sexosDatos {
    static async seed() {
        console.log("Cargando datos");

        const sexos = [
            { id: 1, nombre: "Hombre"},
            { id: 2, nombre: "Mujer"},
        ];

        try {
            for (const sexo of sexos) {
                // Intenta encontrar o crear el tipo de método
                const [instance, created] = await db.Sexo.findOrCreate({
                    where: { id: sexo.id },
                    defaults: sexo
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en sexos: ", error);
        }     
    }
}

export default sexosDatos ;