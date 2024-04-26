
import { urlencoded } from "express";
import { crearNumeroPinDto } from "../interfaces/modelsDtos/crearNumeroPinDto";
import { validarPinAtributos } from "../interfaces/modelsDtos/ValidarPinDto.interface";
import validarNumeroRepository from "../repositorys/validarNumero.repository";
const axios = require('axios');

const url = 'http://api.enviamsg.mx:3000/api/whatsapp/enviaMensaje';
const token = '52f11f4af311d5dd953a55f96643f45d';  // Reemplaza con tu propio token


const crearPin = async (data: crearNumeroPinDto) => {
  try{
    const response = await validarNumeroRepository.crearNumeroPin(data)
    
    if(response.isValid != false){
      const pinWhat = {
        phone:data.numero,
        tipoMensajeId:1,
        mensaje: `hola, este es tu pin ${response.pin}`,
    }
    

    await axios.post(url, pinWhat, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
    .then((respuesta: any) => {
      console.log('Respuesta del servidor:', respuesta.data);
    })
    .catch((error: any) => {
      console.error('Error al realizar la solicitud:', error);
    });    
  }

    return response;
  }catch (error) {
    throw new Error("Error en el servicio: " + (error as Error).message);
}
};


const validarPin = async (data: validarPinAtributos) => {
  try{
  const response = await validarNumeroRepository.validarPin(data);
  return response;
}catch (error) {
  throw new Error("Error en el servicio: " + (error as Error).message);
}
};

export default {crearPin, validarPin}