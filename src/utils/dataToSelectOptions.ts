export const getUnidadMedida = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_UOM,
    label: item.unidaD_MEDIDA
  }));

export const getCategoriaArticulos = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_CATEGORIA_ARTICULOS,
    label: item.categoriA_ARTICULOS
  }));

export const getCategoriaActivos = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_ACTIVOS,
    label: item.activo
  }));

export const getArticulos = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_ITEM,
    label: item.descripcion
  }));

export const getCiudades = (data: any, filter: { iD_ESTADO: number }) =>
  data
    ?.filter((item: any) => item.iD_ESTADO === filter.iD_ESTADO)
    ?.map((item: any) => ({
      value: item.iD_CIUDAD,
      label: item.nombrE_CIUDAD
    }));

export const getEstados = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_ESTADO,
    label: item.nombrE_ESTADO
  }));

export const getEmpresas = (data: any) =>
  data?.map((item: any) => ({
    value: item.iD_EMPRESA,
    label: item.razoN_SOCIAL
  }));

export const getData = (data: any) =>
  data?.map((item: any) => ({
    value: item.id,
    label: item.nombre
  }));

export const getFilterEstudios = (
  data: any,
  filter: { id: number; grupo_de_clientes_id: number },
  id?: number
) =>
  data
    ?.filter((item: any) => item.grupo_de_clientes_id === filter.grupo_de_clientes_id)
    .map((item: any) => ({
      value: item.id,
      label: item.nombre
    }));

export const getSexo = (data: any) =>
  data?.map((item: any) => ({
    value: item.id,
    label: item.nombre
  }));
