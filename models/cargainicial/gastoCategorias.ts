import db from "..";

class GastoCategoriasDatos {
    static async seed() {
        console.log("Cargando datos");

        const gastoCategorias = [
            { id: 1, nombre: "Hospedaje",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 2, nombre: "Alimentos",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 3, nombre: "Transporte aereo",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 4, nombre: "Transporte terrestre",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 5, nombre: "Peaje Y estacionamientos",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 6, nombre: "Servicios de limpieza y lavanderia",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 7, nombre: "Servicios de comunicacion e internet",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 8, nombre: "Combustibles y lubricantes",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 9, nombre: "Materiales e insumos de oficina",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 10, nombre: "Seguros de viaje y coberturas",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 11, nombre: "Costos de equipaje",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 12, nombre: "Gastos por gastos de reservaciones",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 13, nombre: "Gastos de medicamentos y servicios medicos",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 14, nombre: "Impuestos y tazas",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 15, nombre: "Obsequios de negocios",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 16, nombre: "Propinas",icono_url: 'htkljtlk' , esta_activo: true },
            { id: 99, nombre: "Otros",icono_url: 'htkljtlk' , esta_activo: true }
        ];

        try {
            for (const gastoCategoria of gastoCategorias) {
                // Intenta encontrar o crear la categoría de gasto
                const [instance, created] = await db.GastoCategoria.findOrCreate({
                    where: { id: gastoCategoria.id },
                    defaults: gastoCategoria
                });

                if (created) {
                    console.log("Registro insertado.");
                } else {
                    console.log("El registro ya existía.");
                }
            }
        } catch (error) {
            console.error("Error en gastoCategoriaDatos: ", error);
        }     
    }
}

export default GastoCategoriasDatos;