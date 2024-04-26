import { Model, DataTypes , Sequelize } from 'sequelize';
import { UsoCFDIAtributos } from '../interfaces/models/usoCFDI.interface';

module.exports = (cn: Sequelize) => {
class UsoCFDI extends Model<UsoCFDIAtributos>
implements UsoCFDI{
   public id                    !:number;
   public nombre                !:string;
   public esta_activo           !:boolean;
}


UsoCFDI.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    esta_activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
  }, {
    tableName: 'uso_cfdi',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return UsoCFDI;
}
