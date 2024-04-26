import { Model, DataTypes , Sequelize } from 'sequelize';
import { presupuestosuscriptorAtributos } from '../interfaces/models/presupuestosuscriptor_interface';

module.exports = (cn: Sequelize) => {
class PresupuestoSuscriptor extends Model<presupuestosuscriptorAtributos>
implements presupuestosuscriptorAtributos{
    public id                   !: number;
    public presupuesto_id       !: number;
    public suscriptor_id        !: number;
    public esta_activo          !: boolean;
}


PresupuestoSuscriptor.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    presupuesto_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'presupuestos',
        key: 'id',
      }
    },
    suscriptor_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'suscriptores',
          key: 'id',
        }
      },    
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'join_presupuesto_suscriptor',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return PresupuestoSuscriptor;
}
