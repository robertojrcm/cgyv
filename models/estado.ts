
import { Model, DataTypes , Sequelize } from 'sequelize';
import { estadoAtributos } from '../interfaces/models/estado.interface';

module.exports = (cn: Sequelize) => {
class Estados extends Model<estadoAtributos>
implements estadoAtributos{
public id              !: number;
public nombre          !: string;
}


Estados.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
    tableName: 'estados',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Estados;
}
