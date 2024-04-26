import { Model, DataTypes, Sequelize,DecimalDataType } from "sequelize";
import { inicioSesionAtributos } from "../interfaces/models/inicioSesion.interface";

module.exports = (cn: Sequelize) => {
  class InicioSesion extends Model<inicioSesionAtributos>
    implements inicioSesionAtributos {
    public id !: number;
    public token !: string;
    public usuario_id !: number;
    public dispositivo !: string;
    public latitud !: number;
    public longitud !: number;
    public sesion_activa !: boolean;
    public sistema_operativo !: string;
    public fecha_hora_inicio !: Date;
    public fecha_hora_cierre !: Date;
  }

  InicioSesion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: new DataTypes.STRING(200),
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      dispositivo: {
        type: new DataTypes.STRING(200),
        allowNull: false,
      },
      latitud: {
        type: new DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      longitud: {
        type: new DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      sesion_activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      sistema_operativo: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      fecha_hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_hora_cierre: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "registro_inicio_sesion",
      timestamps: false,
      freezeTableName: true,
      sequelize: cn,
    }
  );

  return InicioSesion;
}