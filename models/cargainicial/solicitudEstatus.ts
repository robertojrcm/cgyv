import db from "../../models";

class SolicitudDatos {
    static async seed() {
        console.log("Cargando datos");

        const solicitudEstatus = [
            { id: 1, nombre: "solicitado" },
            { id: 2, nombre: "autorizado" },
            { id: 3, nombre: "rechazado" },
        ];

        try {
            for (const estatus of solicitudEstatus) {
                // Intenta encontrar o crear el estatus de solicitud
                const [instance, created] = await db.SolicitudEstatus.findOrCreate({
                    where: { id: estatus.id },
                    defaults: estatus
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en SolicitudDatos: ", error);
        }     
    }
};

export default SolicitudDatos;
