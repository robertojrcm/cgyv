export interface ingresosAtributos {
    id               ?: number;
    suscriptor_id     : number;
    metodo_pago_id    : number;
    importe           : number;
    fecha_creacion    : Date;
    fecha_modificacion: Date;
    esta_activo       : boolean;
}