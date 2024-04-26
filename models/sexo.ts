import { Sequelize,  DataTypes, Model } from "sequelize";
import { sexoAtributos } from "../interfaces/models/sexo.interface";

module.exports = (cn: Sequelize) => {

class Sexo extends Model<sexoAtributos>
implements sexoAtributos{
  public id               !: number;
  public nombre           !: string;
}

  Sexo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(10),
      allowNull: false,
    },
  }, 
  {
    tableName: 'sexos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });
  return Sexo
}