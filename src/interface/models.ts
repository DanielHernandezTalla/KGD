import { ChangeStatusType } from "@/components/atoms/ArancelCell/ArancelCell";

export interface PrecioDeEstudio {
    // propiedades del modelo
    id: string;
    implementacion_de_estudio_id: number;
    grupo_de_clientes_id: number;
    precio: number | null;
    activo: boolean;
    // propiedades de aplicación
    changeStatus: ChangeStatusType;
    selected: boolean;
    copied: boolean;
    modifying: boolean;
    initialPrecio: number | null | undefined;
  }
  
  export interface ImplementacionDeEstudio {
    // propiedades del modelo
    id: number;
    tipo_de_estudio: string;
    estudio: string;
    precios_de_estudio: PrecioDeEstudio[];
  }
  
  export interface GrupoDeClientes {
    // propiedades del modelo
    id: number;
    orden: number;
    nombre: string;
    sucursal_id: number;
    clientes: Cliente[];
    // propiedades de aplicación
    changeStatus: ChangeStatusType;
  }

  export interface Cliente {
    // propiedades del modelo
    id: number;
    nombre: string;
    grupo_de_clientes_id: number | null;
    // propiedades extras
    grupo_de_clientes_nombre?: string;
    // propiedades de aplicación
    changeStatus: ChangeStatusType;
    initialGrupoDeClientesId: number | null | undefined;
  }