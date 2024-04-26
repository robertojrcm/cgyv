import { Model, DataTypes , Sequelize } from 'sequelize';
import { empresasAtributos } from '../interfaces/models/empresa.interface';

module.exports = (cn: Sequelize) => {
class Empresas extends Model<empresasAtributos>
implements empresasAtributos{
    public id                   !: number;
    public nombres              !: string;
    public correo_electronico   !: string;
    public telefono             !: string;
    public direccion            !: string;
    public url                  !: string;
    public esta_activo          !: boolean;
}


Empresas.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    correo_electronico: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    telefono: {
      type: new DataTypes.STRING(10),
      allowNull: true,
    },
    direccion: {
        type: new DataTypes.STRING(200),
        allowNull: true,
      },
    url: {
        type: new DataTypes.STRING(200),
        allowNull: false,
      },    
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'empresas',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Empresas;
}
