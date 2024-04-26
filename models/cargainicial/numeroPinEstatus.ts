import db from "..";

class NumeroPinEstatusDatos {
    static async seed() {
        console.log("Cargando datos de numero_pin_estatus");

        const estados = [
            { id: 1, nombre: "Vigente",  esta_activo: true  },
            { id: 2, nombre: "Aplicado",  esta_activo: true  },
            { id: 3, nombre: "Vencido",  esta_activo: true  },
        ];

        try {
            for (const estado of estados) {
                // Intenta encontrar o crear el estado
                const [instance, created] = await db.NumeroPinEstatus.findOrCreate({
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
            console.error("Error en Numero_Pin_Estatus: ", error);
        }     
    }
}

export default NumeroPinEstatusDatos;
