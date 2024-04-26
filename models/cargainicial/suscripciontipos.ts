 
import db from "../../models";

class suscripciontiposDatos {
    static async seed() {
        console.log("Cargando datos");

        const suscripcionTipos = [
            { id: 1, nombre: "gratis", esta_activo: true },
            { id: 2, nombre: "premuim", esta_activo: true },
        ];

        try {
            for (const suscripcionTipo of suscripcionTipos) {
                // Intenta encontrar o crear el tipo de suscripción
                const [instance, created] = await db.SuscripcionTipos.findOrCreate({
                    where: { id: suscripcionTipo.id },
                    defaults: suscripcionTipo
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en suscripciontiposDatos: ", error);
        }     
    }
}

export default suscripciontiposDatos;