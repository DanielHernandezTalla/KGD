'use client';
import { FormCiudades } from '@/components/forms/const_ciudades';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EstadosSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'empresa.ciudades.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`ciudad/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar Ciudad'
      rutaToCheck='empresa.ciudades.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormCiudades
        initialValues={{
          iD_CIUDAD: data?.dato?.iD_CIUDAD,
          nombrE_CIUDAD: data?.dato?.nombrE_CIUDAD,
          iD_ESTADO: data?.dato?.iD_ESTADO,
          estatus: data?.dato?.estatus
        }}
        url='ciudad'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
