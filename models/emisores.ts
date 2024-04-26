import { Model, DataTypes , Sequelize } from 'sequelize';
import { emisoresAtributos } from '../interfaces/models/emisores.interface';

module.exports = (cn: Sequelize) => {
class Emisores extends Model<emisoresAtributos>
implements emisoresAtributos{
    public id                  !: number;
    public establecimiento_id  !: number;
    public rfc                 !: string;
    public razon_social        !: string;
    public domicilio_fiscal    !: string;
    public esta_activo         !: boolean;
}


Emisores.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    establecimiento_id: {
      type: new DataTypes.INTEGER,
      references:{
      model:"establecimientos",
      key:"id",
      },
    },
    rfc: {
      type: new DataTypes.STRING(15),
      allowNull: false,
    },
    razon_social: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    domicilio_fiscal: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },  
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'emisores',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Emisores;
}
