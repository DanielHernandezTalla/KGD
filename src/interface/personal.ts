export interface IPersonal extends ITipoPersonal {
  id: number;
  activo: boolean;
  apellidoMaterno: string;
  apellidoPaterno: string;
  correo: string;
  idPersonal: number;
  sucursal_id: number;
  nombre: string;
}

interface ITipoPersonal {
  idTipoPersonal: number;
  tipo: string;
}
