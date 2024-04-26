import { NumeroPinesAtributos } from "../interfaces/models/numeroPines.interface";
import { crearNumeroPinDto } from "../interfaces/modelsDtos/crearNumeroPinDto";
import { validarPinAtributos } from "../interfaces/modelsDtos/ValidarPinDto.interface";
import db from "../models";
import { Sequelize, DataTypes, DATE } from 'sequelize';



const crearNumeroPin = async (data: crearNumeroPinDto) => {

    /* Validar que el pin no se ha entregado y entregar el mismo*/

    const pinVigente = await db.NumeroPines.findAndCountAll({
        where: { numero: data.numero, numero_pin_estatus_id: 1 } 
        });
        // obtenemos la fecha.
        if (pinVigente.count != 0){
            const fechaCon5minutos =  await sumar5Minutos(pinVigente.rows[0].fecha_creacion);
            const fechaVencimientoSinZonaHoraria = await obtenerFechaSinZonaHoraria(fechaCon5minutos);
            const fechaValidarSinZonaHoraria = await obtenerFechaSinZonaHoraria(new Date());
            if (fechaValidarSinZonaHoraria < fechaVencimientoSinZonaHoraria) {
                // El número de teléfono ya existe, realizar rollback
                const pinVigente = {
                    data: data,
                    menssage:"El pin sigue vigente",
                    isValid: false
                };
            return pinVigente;    
            }
        }
        
    const pin = generarPin();

    const nuevoNumeroPin: NumeroPinesAtributos = {
        numero:                   data.numero,
        fecha_creacion            : data.fecha_creacion,
        pin                       : pin,
        minutos_vigencia          : 5
};
    const response = await db.NumeroPines.create(nuevoNumeroPin);



return response;
};

const validarPin = async (data: validarPinAtributos) => {

const response = await db.NumeroPines.findAndCountAll({
    where: { numero: data.numero, pin: data.pin } 
    });
    // obtenemos la fecha.
    const fechaCon5minutos =  await sumar5Minutos(response.rows[0].fecha_creacion);
    const fechaVencimientoSinZonaHoraria = await obtenerFechaSinZonaHoraria(fechaCon5minutos);
    const fechaValidarSinZonaHoraria = await obtenerFechaSinZonaHoraria(new Date());

    if (fechaValidarSinZonaHoraria  > fechaVencimientoSinZonaHoraria) {
        // El número de teléfono ya existe, realizar rollback
        await db.NumeroPines.update({numero_pin_estatus_id: 3},{where: {numero: data.numero, numero_pin_estatus_id: 1}})
        const response = {
            data: data,
            menssage:"El pin ya esta caducado",
            isValid: false
        }
        return response;    
    }
    else{
        await db.NumeroPines.update({numero_pin_estatus_id: 2},{where: {numero: data.numero, pin: data.pin, numero_pin_estatus_id: 1}})
    }
    


    return response;
};




function generarPin() {
    let pinAleatorio = Math.floor(Math.random() * 9000) + 1000; // Genera un número aleatorio entre 1000 y 9999

    return pinAleatorio.toString();

}

async function sumar5Minutos(fecha_creacion: Date) {
    // Clonar la fecha de entrada para evitar modificar la fecha original
    const fechaClonada = new Date(fecha_creacion);

    // Sumar 5 minutos a la fecha clonada
    fechaClonada.setMinutes(fechaClonada.getMinutes() + 5);

    return fechaClonada;
}

async function obtenerFechaSinZonaHoraria(Fecha: Date) {
    const moment = require('moment-timezone');
    moment.tz.setDefault('America/Mazatlan');
    const fecha_date = moment((Fecha).toLocaleDateString(), 'D/M/YYYY');
    const fecha_ano = fecha_date.year();
    const fecha_mes = fecha_date.month()+1;
    const fecha_dia = fecha_date.date();

    const fecha_time = moment((Fecha).toLocaleTimeString(), 'HH:mm:ss');
    const fecha_time_horas = fecha_time.hours();
    const fecha_time_time_minutos = fecha_time.minutes();
    const fecha_time_segundos = fecha_time.seconds();

    const fechaSinZonaHoraria = `${fecha_ano}-${fecha_mes}-${fecha_dia} ${fecha_time_horas}:${fecha_time_time_minutos}:${fecha_time_segundos}`

    return fechaSinZonaHoraria;
}


export default {
    crearNumeroPin, validarPin
}