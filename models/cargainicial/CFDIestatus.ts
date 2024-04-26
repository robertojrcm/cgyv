import db from "../../models";

class CFDIestatusDatos {
    static async seed() {
        console.log("Cargando datos de CFDIestatus");

        const estados = [
            { id: 1, nombre: "Vigente", descripcion: "El CFDI ha sido generado y se encuentra disponible para su consulta." },
            { id: 2, nombre: "Cancelado", descripcion: "El emisor ha solicitado la cancelacion del CFDI ante el servicio de Administracion tributaria (SAT) y esta solicitud ha sido aceptada" },
            { id: 3, nombre: "No Encontrado", descripcion: "indica que el CFDI no se encuentra en la base de datos del SAT, puede ser porque no se ha registrado o fue eliminado" },
            { id: 4, nombre: "En Proceso ", descripcion: "Indica que el CFDI esta en proceso de ser validado por el SAT" }
        ];

        try {
            for (const estado of estados) {
                // Intenta encontrar o crear el estado
                const [instance, created] = await db.CFDIEstatus.findOrCreate({
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
            console.error("Error en CFDIestatusSeed: ", error);
        }     
    }
}

export default CFDIestatusDatos;
