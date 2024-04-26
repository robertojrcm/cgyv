import { Sequelize } from 'sequelize';
import db from "../../models";

class estadosDatos {
    static async seed() {
        console.log("Cargando datos");

        const estados = [
            { id: 1, nombre: "Aguascalientes" },
            { id: 2, nombre: "Baja California" },
            { id: 3, nombre: "Baja California Sur" },
            { id: 4, nombre: "Campeche" },
            { id: 5, nombre: "Chiapas" },
            { id: 6, nombre: "Chihuahua" },
            { id: 7, nombre: "Ciudad de México" },
            { id: 8, nombre: "Coahuila" },
            { id: 9, nombre: "Colima" },
            { id: 10, nombre: "Durango" },
            { id: 11, nombre: "Estado de México" },
            { id: 12, nombre: "Guanajuato" },
            { id: 13, nombre: "Guerrero" },
            { id: 14, nombre: "Hidalgo" },
            { id: 15, nombre: "Jalisco" },
            { id: 16, nombre: "Michoacán" },
            { id: 17, nombre: "Morelos" },
            { id: 18, nombre: "Nayarit" },
            { id: 19, nombre: "Nuevo León" },
            { id: 20, nombre: "Oaxaca" },
            { id: 21, nombre: "Puebla" },
            { id: 22, nombre: "Querétaro" },
            { id: 23, nombre: "Quintana Roo" },
            { id: 24, nombre: "San Luis Potosí" },
            { id: 25, nombre: "Sinaloa" },
            { id: 26, nombre: "Sonora" },
            { id: 27, nombre: "Tabasco" },
            { id: 28, nombre: "Tamaulipas" },
            { id: 29, nombre: "Tlaxcala" },
            { id: 30, nombre: "Veracruz" },
            { id: 31, nombre: "Yucatán" },
            { id: 32, nombre: "Zacatecas" }
        ];
        

        try {
            for (const estado of estados) {
                // Intenta encontrar o crear el tipo de método
                const [instance, created] = await db.Estados.findOrCreate({
                    where: { id: estado.id },
                    defaults: estado
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en estados: ", error);
        }     
    }
}

export default estadosDatos ;