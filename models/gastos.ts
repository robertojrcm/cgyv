import { Model, DataTypes , Sequelize, DecimalDataType } from 'sequelize';
import { GastoAtributos } from '../interfaces/models/gastos.interface';


module.exports = (cn: Sequelize) => {

  class Gastos extends Model<GastoAtributos>
  implements GastoAtributos{
    public id                     !: number;
    public suscriptor_id          !: number;
    public presupuesto_id         !:number;
    public gasto_categoria_id     !:number;
    public establecimiento_id     !:number;
    public metodo_pago_id         !:number;
    public importe                !:number;
    public descripcion            !:string;
    public latitud                !:string;
    public longitud               !:string;
    public fecha_creacion         !:Date;
    public fecha_modificacion     !:Date;
    public es_facturable          !:boolean;
    public es_reembolsable        !:boolean;
    public esta_activo            !:boolean;
  }


  Gastos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suscriptor_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:"suscriptores",
        key:"id",
      },
    },
    presupuesto_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
       references:{
         model:"presupuestos",
         key:"id",
       },
    },
    gasto_categoria_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
       references:{
         model:"gasto_categorias",
         key:"id",
       },
    },
    establecimiento_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
       references:{
         model:"establecimientos",
         key:"id",
       },
    },
    metodo_pago_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
       references:{
         model:"metodo_pagos",
         key:"id",
       },
    },
    importe:{
      type: DataTypes.DECIMAL,
      allowNull:false,
      },
    descripcion: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
    latitud: {
      type: new DataTypes.STRING(200),
      allowNull: false,
      },
    longitud: {
      type: new DataTypes.STRING(200),
      allowNull: false,
      },
    fecha_creacion:{
      type: DataTypes.DATE,
      allowNull:false,
      },
    fecha_modificacion:{
      type: DataTypes.DATE,
      allowNull:false,
        },
    es_facturable: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
        },
    es_reembolsable: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
        },   
      esta_activo: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
  }, 
  {
    tableName: 'gastos',
        timestamps: false,
        freezeTableName:true,
        sequelize: cn,
  });

  return Gastos;
}
