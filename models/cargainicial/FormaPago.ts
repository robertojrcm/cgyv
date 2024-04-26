import { Sequelize } from 'sequelize';
import db from "..";

class FormaPagoDatos {
    static async seed() {
        console.log("Cargando datos");

        const formapagos = [
            { id: 1, nombre: "Tarjeta de debito", esta_activo: true },
            { id: 2, nombre: "Tarjeta de credito", esta_activo: true },
            { id: 3, nombre: "Billetera ", esta_activo: true },
        ];

        try {
            for (const formapago of formapagos) {
                // Intenta encontrar o crear el tipo de método
                const [instance, created] = await db.FormaPago.findOrCreate({
                    where: { id: formapago.id },
                    defaults: formapago
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en metodoTipoDatos: ", error);
        }     
    }
}

export default FormaPagoDatos ;