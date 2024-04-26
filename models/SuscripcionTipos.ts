import { Model, DataTypes , Sequelize, DecimalDataType } from 'sequelize';

import { SuscripcionTiposAtributos } from '../interfaces/models/suscripcionTipos.interface';

module.exports = (cn: Sequelize) => {

  class SuscripcionTipos extends Model<SuscripcionTiposAtributos>
  implements SuscripcionTiposAtributos{
  public id         !: number;
  public nombre     !: string;
  public esta_activo!: boolean;
  }


  SuscripcionTipos.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: new DataTypes.STRING(80),
    allowNull: false,
  },
  esta_activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'suscripcion_tipos',
  timestamps: false,
  freezeTableName:true,
  sequelize: cn,  // passing the `sequelize` instance is required
});

return SuscripcionTipos;
};