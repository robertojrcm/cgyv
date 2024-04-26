import { MetodoPagosDto } from '../interfaces/modelsDtos/metodoPagoDto';
import saldoGlobalRepository from '../repositorys/saldoGlobal.repository';

const obtenerSaldoGlobal = async (suscriptorid: number,  MetodoPagosDto : MetodoPagosDto) => {
    try {
        const saldoGlobal = await saldoGlobalRepository.obtenerSaldoGlobal(suscriptorid, MetodoPagosDto);
        if (saldoGlobal === null || saldoGlobal === undefined) {
            throw new Error('No se encontró el saldo global');
        }
        // Ahora devolvemos un objeto con las propiedades requeridas
        return {
            saldoGlobal,
            detalleMetodosPago: [] // Puedes llenar esto con los detalles si los necesitas
        };
    } 
    catch (error) {
        throw new Error(`Error al obtener el saldo global: ${error}`);
    }
};

export default { obtenerSaldoGlobal };
