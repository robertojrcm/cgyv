import { Sequelize,  DataTypes, Model } from "sequelize";
import { GastoCategoriaAtributos } from "../interfaces/models/gastoCategorias.interface";

module.exports = (cn: Sequelize) => {

class GastoCategoria extends Model<GastoCategoriaAtributos>
implements GastoCategoriaAtributos{
  public id               !: number;
  public nombre           !: string;
  public icono_url        !: string;
  public esta_activo      !: boolean;
}

  GastoCategoria.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(80),
      allowNull: false,
    },
    icono_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    esta_activo: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      },
  }, 
  {
    tableName: 'gasto_categorias',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
  });
  return GastoCategoria
}