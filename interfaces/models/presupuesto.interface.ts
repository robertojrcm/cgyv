export interface presupuestoAtributos {
    id              ?: number;
    empresa_id      : number;
    nombre          : string;
    importe_total   : number;
    importe_usado   : number;
    fecha_inicio    : Date;
    fecha_fin       : Date;
    esta_activo     : boolean;
  }
