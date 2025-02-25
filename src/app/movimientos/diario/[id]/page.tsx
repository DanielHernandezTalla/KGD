'use client';
import { FormAjusteInventario } from '@/components/forms/const_ajusteInventario';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function AjusteInventarioSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'ciudad.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`OnhandDiario/stock`, {
    almacen: 2, // Aqui ponemos fijo el almacen al que pertenecemos
    item: params.id
  });

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  // console.log(data);

  return (
    <FormLayout title='Ajuste de inventario' isLoading={isLoading} isError={isError}>
      <FormAjusteInventario
        initialValues={{
          iD_TRNSACCION: 0,
          linea: 1,
          iD_ITEM: data?.dato?.iD_ITEM,
          item: data?.dato?.item,
          descripcion: data?.dato?.descripcion,
          cantidad: data?.dato?.cantidad,
          iD_ALMACEN: data?.dato?.iD_ALMACEN,
          iD_UOM: data?.dato?.iD_UOM,
          unidaD_MEDIDA: data?.dato?.unidaD_MEDIDA,
          iD_TIPO_TRANSACCION: 3,
          costo: data?.dato?.costo,
          iD_ALMACEN_DESTINO: 0,
          segment01: 'string',
          segment02: 'string',
          segment03: 'string',
          segment04: 'string',
          fechA_TRANSACCION: new Date().toISOString().split('T')[0],
          fechA_CREACION: new Date().toISOString().split('T')[0]
        }}
        url='ajustes/ajuste'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
