
import { Model, DataTypes , Sequelize } from 'sequelize';
import { ReceptoresAtributos } from '../interfaces/models/receptores.interface';

module.exports = (cn: Sequelize) => {
class Receptores extends Model<ReceptoresAtributos>
implements ReceptoresAtributos{
   public id                  !: number;
   public suscriptor_id       !: number;
   public uso_cfdi_id         !: number;
   public razon_social        !: string;
   public rfc                 !: string;
   public domicilio_fiscal    !: string;
   public esta_activo         !: boolean;
}


Receptores.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suscriptor_id: {
      type: new DataTypes.INTEGER,
      references:{
      model:"suscriptores",
      key:"id",
      },
    },
    uso_cfdi_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
      references:{
         model:"uso_cfdi",
         key:"id",
      }
    },
    razon_social: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    rfc: {
      type: new DataTypes.STRING(15),
      allowNull: true,
    },
    domicilio_fiscal: {
        type: new DataTypes.STRING(200),
        allowNull: true,
      },   
    esta_activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'receptores',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,
});

return Receptores;
}
