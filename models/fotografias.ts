import { Model, DataTypes , Sequelize } from "sequelize";
import { FotografiasAtributos } from "../interfaces/models/fotografias.interface";

module.exports = (cn: Sequelize) => {
    class Fotografias extends Model<FotografiasAtributos> implements FotografiasAtributos{
        public id               !: number;
        public gasto_id         !: number;
        public ruta_archivo     !: string;
        public fecha_creacion   !: Date;
        public esta_activo      !: boolean;
    }

    Fotografias.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gasto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'gastos',
                key: 'id',
            }
        },
        ruta_archivo: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        esta_activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'fotografias',
        timestamps: false,
        freezeTableName:true,
        sequelize: cn,
    });

    return Fotografias;}