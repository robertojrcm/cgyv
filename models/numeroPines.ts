import { Model, DataTypes , Sequelize, DecimalDataType } from 'sequelize';
import { NumeroPinesAtributos } from '../interfaces/models/numeroPines.interface';


module.exports = (cn: Sequelize) => {


  class NumeroPines extends Model<NumeroPinesAtributos>
  implements NumeroPinesAtributos{
    public id               !: number;
    public numero           !: string;
    public pin           !: string;
    public fecha_creacion      !: Date;
    public minutos_vigencia     !: number;
    public numero_pin_estatus_id       !: number;
  }

  NumeroPines.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    pin:{
      type: DataTypes.STRING(4),
      allowNull:false,
    },
    fecha_creacion: {
      type: 'timestamp without time zone',
      defaultValue: DataTypes.NOW
    },
    minutos_vigencia: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      },
      numero_pin_estatus_id : {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
           model:"numero_pin_estatus",
           key:"id",
         },
    },
  }, 
  {
    tableName: 'numero_pines',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });

  return NumeroPines
}
