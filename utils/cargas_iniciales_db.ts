
import { Sequelize, QueryTypes } from 'sequelize';
import CFDIestatusDatos from '../models/cargainicial/CFDIestatus';
import GastoCategoriasDatos from '../models/cargainicial/gastoCategorias';
import FormaPagoDatos from '../models/cargainicial/FormaPago';
import suscripciontiposDatos from '../models/cargainicial/suscripciontipos';
import girosDatos from '../models/cargainicial/giros';
import NumeroPinEstatusDatos from '../models/cargainicial/numeroPinEstatus';
import SolicitudDatos from '../models/cargainicial/solicitudEstatus';
import sexosDatos from '../models/cargainicial/sexos';
import estadosDatos from '../models/cargainicial/Estados';
import ciudadDatos from '../models/cargainicial/ciudades';

class CargaInicialDB {

    static async inicializar() {   


        console.log("Cargas Iniciales");
        await SolicitudDatos.seed();
        await CFDIestatusDatos.seed();
        await GastoCategoriasDatos.seed();
        await girosDatos.seed();
        await FormaPagoDatos.seed();
        await suscripciontiposDatos.seed();
        await NumeroPinEstatusDatos.seed();
        await sexosDatos.seed();
        await estadosDatos.seed();
        await ciudadDatos.seed();
    }
  }
  
  export default CargaInicialDB;