import { Model ,DataTypes, Sequelize } from "sequelize";
import { solicitudEstablecimientoAtributos } from "../interfaces/models/solicitudEstablecimientos.interface";

module.exports = (cn: Sequelize) => {

    class SolicitudEstablecimientos extends Model<solicitudEstablecimientoAtributos>
    implements solicitudEstablecimientoAtributos{
    public id                      !: number;
    public giro_id                 !: number;
    public ciudad_id               !: number;
    public establecimiento_id      !: number;
    public nombre                  !: string;
    public direccion               !: string;
    public latitud                 !: number;
    public longitud                !: number;
    public telefono                !: string;
    public correo_electronico      !: string;
    public url                     !: string;
    public usuario_creador_id      !: number;
    public usuario_autorizador_id  !: number;
    public fecha_creacion          !: Date;
    public fecha_modificacion      !: Date;
    public solicitud_estatus_id    !: number;

    }

    SolicitudEstablecimientos.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    giro_id: {
        type: new DataTypes.INTEGER,
        references:{
        model:"giros",
        key:"id",},
    },
    ciudad_id: {
        type: new DataTypes.INTEGER,
        references:{
        model:"ciudades",
        key:"id",
    },
    },
    establecimiento_id: {
        type: new DataTypes.INTEGER,
        references:{
        model:"establecimientos",
        key:"id",
    },},
    nombre: {
        type: new DataTypes.STRING(200),
        allowNull: false,
    },
    direccion: {
        type: new DataTypes.STRING(200),
        allowNull: false,
    },
    latitud: {
        type: new DataTypes.STRING(200),
        allowNull: false,
    },
    longitud: {
        type: new DataTypes.STRING(200),
        allowNull: false,
    },
    telefono: {
        type: new DataTypes.STRING(15),
        allowNull: false,
    },
    correo_electronico: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    url: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    usuario_creador_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_autorizador_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_creacion: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    fecha_modificacion: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    solicitud_estatus_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    }, {
    tableName: 'solicitud_establecimientos',
    timestamps: false,
    freezeTableName:true,
    sequelize: cn,  // passing the `sequelize` instance is required
    });

    return SolicitudEstablecimientos;
};