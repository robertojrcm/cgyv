import { Model,DataTypes ,Sequelize } from 'sequelize';
import { solicitudEstatusAtributos } from '../interfaces/models/solicitudEstatus.interface';

module.exports = (cn: Sequelize) => {

    class SolicitudEstatus extends Model<solicitudEstatusAtributos>
    implements solicitudEstatusAtributos{
        public id         !: number;
        public nombre     !: string;
    }

    SolicitudEstatus.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        tableName: 'solicitud_estatus',
        timestamps: false,
        freezeTableName:true,
        sequelize: cn,  // passing the `sequelize` instance is required
    });

    return SolicitudEstatus;}
