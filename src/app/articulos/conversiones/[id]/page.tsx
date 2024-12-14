'use client';
import { FormConversionesArticulos } from '@/components/forms/const_conversionesDeArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function ArticulosSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'articulos.conversiones.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`conversiones/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar conversión de artículos'
      rutaToCheck='articulos.conversiones.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormConversionesArticulos
        initialValues={{
          iD_CONVERSION: data?.dato?.iD_CONVERSION,
          iD_ITEM: data?.dato?.iD_ITEM,
          iD_UOM_ORIGEN: data?.dato?.iD_UOM_ORIGEN,
          iD_UOM_DESTINO: data?.dato?.iD_UOM_DESTINO,
          cantidaD_ORIGEN: data?.dato?.cantidaD_ORIGEN,
          cantidaD_DESTINO: data?.dato?.cantidaD_DESTINO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='conversiones'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
