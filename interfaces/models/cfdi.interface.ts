export interface cfdiAtributos {
    id              ?: number;
    gasto_id        ?: number;
    emisor_id       ?: number;
    receptor_id     ?: number;
    metodo_pago_id  ?: number;
    uso_cfdi_id     ?: number;
    importe_subtotal?: number;
    importe_impuesto?: number;
    importe_total   ?: number;
    fecha_emision   ?: Date;
    ruta_archivo_xml?: string;
    ruta_archivo_pdf?: string;
    cfdi_estatus_id ?: number;
}