export interface MetodoPagosDto {
  suscriptor_id: number;
  forma_pago_id: number;
  descripcion: string;
  saldo: number;
  esta_activo: boolean;
}