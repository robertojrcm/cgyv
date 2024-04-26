import { Sequelize,  DataTypes, Model } from "sequelize";
import { giroAtributos } from "../interfaces/models/giros.interface";

module.exports = (cn: Sequelize) => {

class Giros extends Model<giroAtributos>
implements giroAtributos{
  public id               !: number;
  public nombre           !: string;
  public esta_activo      !: boolean;  
}

  Giros.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(120),
      allowNull: false,
    },
    esta_activo: {
      type: new DataTypes.BOOLEAN,
      allowNull: false
    }

  }, 
  {
    tableName: 'giros',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });
  return Giros
}

export default module.exports;
