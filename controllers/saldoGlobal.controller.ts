import { NUMBER } from 'sequelize';
import { MetodoPagosDto } from '../interfaces/modelsDtos/metodoPagoDto';
import saldoGlobalService from '../services/saldoGlobal.service';
import { Request, Response } from 'express';

const obtenerSaldoGlobal = async (req: Request, res: Response ) => {
    try {
        const id = Number(req.body.suscriptor_id);
        const suscriptorId = req.body.suscriptor_id;

        // Verificar si el ID del suscriptor es válido
        if (isNaN(suscriptorId) || suscriptorId <= 0) {
            res.status(400).json({ error: 'El ID del suscriptor no es válido' });
            return;
        }

        // Crear el DTO de MetodoPagos
        const data: MetodoPagosDto = {
            suscriptor_id: suscriptorId,
            forma_pago_id: 0,
            descripcion: '',
            saldo: 0,
            esta_activo: false
        };

        // Llamar al servicio para obtener el saldo global
        const saldoGlobal = await saldoGlobalService.obtenerSaldoGlobal(suscriptorId, data);

        if (saldoGlobal) {
            res.status(200).json({ saldoGlobal });
        } else {
            res.status(404).json({ message: 'Saldo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default { obtenerSaldoGlobal };
