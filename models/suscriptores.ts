import { Model, DataTypes , Sequelize } from 'sequelize';
import { suscriptoresAtributos } from '../interfaces/models/suscriptores.interface';

module.exports = (cn: Sequelize) => {
class Suscriptores extends Model<suscriptoresAtributos>
implements suscriptoresAtributos{
    public id!: number;
    public suscripcion_tipo_id!: number;
    public usuario_id!:number;
    public sexo_id!:boolean;
    public nombres!: string;
    public apellido_paterno!: string;
    public apellido_materno!: string;
    public telefono!: string;
    public correo_electronico!: string;
    public esta_activo!: boolean;
}


Suscriptores.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suscripcion_tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'suscripcion_tipos',
        key: 'id',
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      }
    },
    sexo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
       references: {
         model: 'sexos',
         key: 'id',
       }
    },
    nombres: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    apellido_paterno: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    apellido_materno: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: new DataTypes.STRING(10),
      allowNull: false,
    },
    correo_electronico: {
      type: new DataTypes.STRING(100),
      allowNull: true,
        },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'suscriptores',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Suscriptores;
}
