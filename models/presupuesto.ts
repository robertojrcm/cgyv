import { Model, DataTypes , Sequelize } from 'sequelize';
import { presupuestoAtributos } from '../interfaces/models/presupuesto.interface';

module.exports = (cn: Sequelize) => {
class Presupuesto extends Model<presupuestoAtributos>
implements presupuestoAtributos{
    public id              !: number;
    public empresa_id      !: number;
    public nombre          !: string;
    public importe_total   !: number;
    public importe_usado   !: number;
    public fecha_inicio    !: Date;
    public fecha_fin       !: Date;
    public esta_activo     !: boolean;
}


Presupuesto.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empresa_id: {
      type: new DataTypes.INTEGER,
      references:{
      model:"empresas",
      key:"id",
      },
    },
    nombre: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    importe_total: {
        type: new DataTypes.DECIMAL,
        allowNull: false,
      },
    importe_usado: {
      type: new DataTypes.DECIMAL,
      allowNull: true,
    },
    fecha_inicio: {
        type: new DataTypes.DATE,
        allowNull: true,
      },
    fecha_fin: {
        type: new DataTypes.DATE,
        allowNull: false,
      },    
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'presupuestos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Presupuesto;
}
