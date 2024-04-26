import { Model, DataTypes , Sequelize, DecimalDataType } from 'sequelize';
import { metodoPagosAtributos } from '../interfaces/models/metodoPagos.interface';

module.exports = (cn: Sequelize) => {


  class MetodoPagos extends Model<metodoPagosAtributos>
  implements metodoPagosAtributos{
    public id               !: number;
    public suscriptor_id    !: number;
    public forma_pago_id     !: number;
    public descripcion      !: string;
    public saldo     !: number;
    public esta_activo       !: boolean;
  }

  MetodoPagos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suscriptor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "suscriptores",
        key: "id",
      }
    },
    forma_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "forma_pago",
        key: "id",
      }
    },
    descripcion: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    saldo: {
        type: new DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0 ,
      },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, 
  {
    tableName: 'metodo_pagos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });

  return MetodoPagos
}
