import "dotenv/config";
import db from "./models";
import express from "express";
import CargaInicialDB from "./utils/cargas_iniciales_db";


async function main() {
    try {
        
        await db.sequelize.authenticate();
      // await db.sequelize.sync({ alter: true });
        console.log('Conexion establecida correctamente');
      // await CargaInicialDB.inicializar();


        const PORT = process.env.PORT || 3000;
        const app = express();
        const cors = require('cors');   
        app.use(cors());
        app.use(express.json());

        const { router } = require("./routes");
        app.use(router);    
        app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));

    } catch (error) {
        console.error(error);
    }   
}

main();

function cors(): any {
  throw new Error("Function not .");
}
