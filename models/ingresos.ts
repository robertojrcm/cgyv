import { Sequelize,  DataTypes, Model } from "sequelize";
import { ingresosAtributos } from "../interfaces/models/ingresos.interface";

module.exports = (cn: Sequelize) => {

class Ingresos extends Model<ingresosAtributos>
implements ingresosAtributos{
    id                ?: number;
    suscriptor_id     !: number;
    metodo_pago_id    !: number;
    importe           !: number;
    fecha_creacion    !: Date;
    fecha_modificacion!: Date;
    esta_activo       !: boolean; 
}

  Ingresos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suscriptor_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "suscriptores",
        key: "id",
      }
    },
    metodo_pago_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "metodo_pagos",
        key: "id",
      }
    },
    importe: {
      type: new DataTypes.DECIMAL,
      allowNull: false,
    },
    fecha_creacion: {
      type: new DataTypes.DATE,
      allowNull: false,
    },
    fecha_modificacion: {
      type: new DataTypes.DATE,
      allowNull: false,
    },
    esta_activo: {
      type: new DataTypes.BOOLEAN,
      allowNull: false
    },
  }, 
  {
    tableName: 'ingresos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });
  return Ingresos
}