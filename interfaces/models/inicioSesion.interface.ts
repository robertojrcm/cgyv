export interface inicioSesionAtributos {
    id                    ?: number;
    token                  : string;
    usuario_id             : number;
    dispositivo            : string;
    latitud                : number;
    longitud               : number;
    sesion_activa          : boolean;
    sistema_operativo      : string;
    fecha_hora_inicio      : Date;
    fecha_hora_cierre      : Date;
}