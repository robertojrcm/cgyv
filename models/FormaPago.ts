import { Sequelize,  DataTypes, Model } from "sequelize";
import { FormaPagoAtributos } from "../interfaces/models/FormaPago.interface";
 

module.exports = (cn: Sequelize) => {

class FormaPago extends Model<FormaPagoAtributos>
implements FormaPagoAtributos{
 
  public id               !: number;
  public nombre           !: string;
  public esta_activo      !: boolean;
}

  FormaPago.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    esta_activo: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
      },
  }, 
  {
    tableName: 'forma_pago',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });
  return FormaPago;
}