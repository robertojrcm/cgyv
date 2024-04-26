import { Model, DataTypes , Sequelize } from 'sequelize';
import { NumeroPinEstatusAtributos } from '../interfaces/models/numeroPinEstatus.interface';

module.exports = (cn: Sequelize) => {
class NumeroPinEstatus extends Model<NumeroPinEstatusAtributos>
implements NumeroPinEstatusAtributos{
   public id                    !: number;
   public nombre                !:string;
   public esta_activo           !: boolean ;
}


NumeroPinEstatus.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    esta_activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, 
{
    tableName: 'numero_pin_estatus',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return NumeroPinEstatus;
}
