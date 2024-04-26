import { Model, DataTypes , Sequelize } from 'sequelize';
import { establecimientosAtributos } from '../interfaces/models/establecimientos.interface';

module.exports = (cn: Sequelize) => {
class Establecimientos extends Model<establecimientosAtributos>
implements establecimientosAtributos{
   public id                    !: number;
   public giro_id               !: number;
   public ciudad_id             !: number;
   public nombre                !: string;
   public direccion             !: string;
   public latitud               !: string;
   public longitud              !: string;
   public telefono              !: string;
   public correo_electronico    !: string;
   public url                   !: string;
   public esta_activo           !: boolean;
}


Establecimientos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'giros',
        key: 'id',
      }
    },
    ciudad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ciudades',
        key: 'id',
      }
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    latitud: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    longitud: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    
    telefono: {
      type: new DataTypes.STRING(10),
      allowNull: true,
    },
    correo_electronico: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    url: {
        type: new DataTypes.STRING(200),
        allowNull: true,
      },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'establecimientos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Establecimientos;
}
