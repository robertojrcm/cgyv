import { Model, DataTypes , Sequelize, DecimalDataType } from 'sequelize';
import { usuarioAtributos } from '../interfaces/models/usuarios.interface';

module.exports = (cn: Sequelize) => {

  class Usuarios extends Model<usuarioAtributos>
  implements usuarioAtributos{
    public id        !: number;
    public usuario   !: string;
    public contrasena!: string;
    public esta_activo!: boolean;
  }



  Usuarios.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    contrasena: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, 
  {
    tableName: 'usuarios',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Usuarios;
}
