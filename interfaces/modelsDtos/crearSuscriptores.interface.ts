export interface CrearSuscriptorDto {
    suscripcion_tipo_id          :number;
    usuario_id                   :number;
    sexo_id                      :boolean;
    nombres                      :string;
    apellido_paterno             :string;
    apellido_materno             :string;
    telefono                     :string;
    correo_electronico           :string;
}