export interface solicitudEstablecimientoAtributos {
    id                     ?: number;
    giro_id                 : number;
    ciudad_id               : number;
    establecimiento_id      : number;
    nombre                  : string;
    direccion               : string;
    latitud                 : number;
    longitud                : number;
    telefono                : string;
    correo_electronico      : string;
    url                     : string;
    usuario_creador_id      : number;
    usuario_autorizador_id  : number;
    fecha_creacion          : Date;
    fecha_modificacion      : Date;
    solicitud_estatus_id    : number;
}