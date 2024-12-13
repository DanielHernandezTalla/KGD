'use client';
import { FormArea } from '@/components/forms/const_area';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function AreaSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'personal.areas.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`areas/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar Area'
      rutaToCheck='personal.areas.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormArea
        initialValues={{
          iD_AREA: data?.dato?.iD_AREA,
          area: data?.dato?.area,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='areas'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
