'use client';
import { FormEstatusSalida } from '@/components/forms/const_estatusSalida';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EstatusSalidaSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'SalidaEstatus.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `SalidaEstatus/${params.id}`
  );

  return (
    <FormLayout
      title='Modificar Estatus Salida'
      rutaToCheck='SalidaEstatus.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormEstatusSalida
        initialValues={{
          iD_SALIDA_ESTATUS: data?.dato?.iD_SALIDA_ESTATUS,
          salidA_ESTATUS: data?.dato?.salidA_ESTATUS,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='SalidaEstatus'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
