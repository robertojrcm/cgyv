import { MetodoPagosDto } from '../interfaces/modelsDtos/metodoPagoDto';
import db from '../models';

const obtenerSaldoGlobal = async (id: number, data: MetodoPagosDto) => {
  try {
    // Buscar al suscriptor por su ID
    const suscriptor = await db.Suscriptores.findByPk(id);
    if (!suscriptor) {
      throw new Error('No se encontró el suscriptor con el ID especificado');
    }

    // Obtener los métodos de pago del suscriptor usando los datos del DTO
    const metodosPago = await db.MetodoPagos.findAll({
      where: { suscriptor_id: data.suscriptor_id },
    });

    console.log("se encontraron los metodos de pago:",metodosPago);

    if (metodosPago.length === 0) {
      throw new Error('No se encontraron métodos de pago con el ID del suscriptor');
    }

    // Calcular el saldo global sumando los importes de los métodos de pago
    let saldoGlobal = 0;
    const detalleMetodosPago: { metodo: string, importe: number }[] = [];

    for (const metodo of metodosPago) {
      saldoGlobal += parseFloat(metodo.saldo);
      detalleMetodosPago.push({
        metodo: metodo.descripcion,
        importe: parseFloat(metodo.saldo)
      });
    }

    // Devolver el saldo global y el detalle de métodos de pago
    return { saldoGlobal, 
      detalleMetodosPago
      };
  } catch (error) {
    throw error; 
  }
};

export default { obtenerSaldoGlobal };
