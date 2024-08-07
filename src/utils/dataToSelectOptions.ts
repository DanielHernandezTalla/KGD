export const getData = (data: any) =>
  data?.map((item: any) => ({
    value: item.id,
    label: item.nombre
  }));

export const getFilterEstudios = (
  data: any,
  filter: { id: number; grupo_de_clientes_id: number; },
  id?: number
) => (data
  ?.filter((item: any) => item.grupo_de_clientes_id === filter.grupo_de_clientes_id)
  .map((item: any) => ({
    value: item.id,
    label: item.nombre,
  }))
);