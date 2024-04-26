
import { Model, DataTypes , Sequelize } from 'sequelize';
import { ciudadesAtributos } from '../interfaces/models/ciudades.interface';

module.exports = (cn: Sequelize) => {
class Ciudades extends Model<ciudadesAtributos>
implements ciudadesAtributos{
public id              !: number;
public estado_id       !: number;
public nombre          !: string;
}


Ciudades.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado_id: {
    type: DataTypes.INTEGER,
    references:{
        model:"estados",
        key:"id",
        },
    },
    nombre: {
      type: new DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
    tableName: 'ciudades',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Ciudades;
}
