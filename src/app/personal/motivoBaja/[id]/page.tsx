'use client';
import { FormMotivoBaja } from '@/components/forms/const_motivoBaja';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function MotivoBajaSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'motivobaja.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`motivobaja/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar motivo de baja'
      rutaToCheck='motivobaja.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormMotivoBaja
        initialValues={{
          iD_MOTIVO_BAJA: data?.dato?.iD_MOTIVO_BAJA,
          motivO_BAJA: data?.dato?.motivO_BAJA,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='motivobaja'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
