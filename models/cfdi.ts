
import { Model, DataTypes , Sequelize } from 'sequelize';
import { cfdiAtributos } from '../interfaces/models/cfdi.interface';

module.exports = (cn: Sequelize) => {
class cfdi extends Model<cfdiAtributos>
implements cfdiAtributos{
  public id                !: number;
  public   gasto_id        !: number;
  public   emisor_id       !: number;
  public   receptor_id     !: number;
  public   metodo_pago_id  !: number;
  public   uso_cfdi_id     !: number;
  public   importe_subtotal!: number;
  public   importe_impuesto!: number;
  public   importe_total   !: number;
  public   fecha_emision   !: Date;
  public   ruta_archivo_xml!: string;
  public   ruta_archivo_pdf!: string;
  public   cfdi_estatus_id !: number;
}


cfdi.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gasto_id: {
      type: new DataTypes.INTEGER,
      references:{
      model:"gastos",
      key:"id",
      },
    },
    emisor_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
      references:{
         model:"emisores",
         key:"id",
      }
    },
    receptor_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references:{
           model:"receptores",
           key:"id",
        }
      },
      metodo_pago_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references:{
           model:"metodo_pagos",
           key:"id",
        }
      },
      uso_cfdi_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references:{
           model:"uso_cfdi",
           key:"id",
        }
      },
    importe_subtotal: {
        type: new DataTypes.DECIMAL,
        allowNull: false,
      },
    importe_impuesto: {
      type: new DataTypes.DECIMAL,
      allowNull: true,
    },
    importe_total: {
        type: new DataTypes.DECIMAL,
        allowNull: true,
      },  
      fecha_emision: {
        type: new DataTypes.DATE,
        allowNull: false,
      },
    ruta_archivo_xml: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
    ruta_archivo_pdf: {
        type: new DataTypes.STRING(200),
        allowNull: true,
      },   
      cfdi_estatus_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references:{
           model:"cfdi_estatus",
           key:"id",
        }
      },
  }, {
    tableName: 'cfdi',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return cfdi;
}
