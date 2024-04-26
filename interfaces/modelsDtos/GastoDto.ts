export interface GastoDto {
    suscriptor_id   : number;
    presupuesto_id :number;
    gasto_categoria_id :number;
    establecimiento_id :number;
    metodo_pago_id :number;
    importe : number;
    descripcion :string;
    latitud :string;
    longitud :string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    es_facturable :boolean;
    es_reembolsable :boolean;
    esta_activo: boolean;
}