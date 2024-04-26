
import db from "..";

class girosDatos {
    static async seed() {
        console.log("Cargando datos");

        const giros = [
            { id: 1, nombre: "Hoteles y alojamientos", esta_activo: true },
            { id: 2, nombre: "Restaurantes y cafeterias", esta_activo: true },
            { id: 3, nombre: "Bares", esta_activo: true },
            { id: 4, nombre: "Supermercados y Tiendas de conveniencia", esta_activo: true },
            { id: 5, nombre: "Compañias aereas", esta_activo: true },
            { id: 6, nombre: "Compañias de transporte terrestre", esta_activo: true },
            { id: 7, nombre: "Taxis y plataformas de transportes", esta_activo: true },
            { id: 8, nombre: "Estacionamiento y peajes", esta_activo: true },
            { id: 9, nombre: "Renta de vehiculos", esta_activo: true },
            { id: 10, nombre: "Transporte publico", esta_activo: true },
            { id: 11, nombre: "Farmacias", esta_activo: true },
            { id: 12, nombre: "Tiendas de electronica y accesorios", esta_activo: true },
            { id: 13, nombre: "Agencia de viajes", esta_activo: true },
            { id: 14, nombre: "Centro de negocios", esta_activo: true },
            { id: 15, nombre: "Centro comerciales y boutiques", esta_activo: true },
            { id: 16, nombre: "Centro de entretenimiento", esta_activo: true },
            { id: 17, nombre: "Estaciones de gas", esta_activo: true },
            { id: 99, nombre: "Otros", esta_activo: true },
        ];

        try {
            for (const giro of giros) {
                // Intenta encontrar o crear el giro
                const [instance, created] = await db.Giros.findOrCreate({
                    where: { id: giro.id },
                    defaults: giro
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en giroDatos: ", error);
        }     
    }
}

export default girosDatos;
