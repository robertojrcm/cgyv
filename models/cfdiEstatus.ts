import { Model, DataTypes , Sequelize } from 'sequelize';
import { cfdiEstatusAtributos } from '../interfaces/models/cfdiEstatus.interface';

module.exports = (cn: Sequelize) => {
class CFDIEstatus extends Model<cfdiEstatusAtributos>
implements cfdiEstatusAtributos{
   public id                    !: number;
   public nombre                !:string;
   public descripcion           !: string;
}


CFDIEstatus.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
  }, {
    tableName: 'cfdi_estatus',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return CFDIEstatus;
}
