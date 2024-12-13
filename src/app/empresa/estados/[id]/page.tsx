'use client';
import { FormEstados } from '@/components/forms/const_estados';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EstadosSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'empresa.estados.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`estados/${params.id}`);

  return (
    <FormLayout
      title='Modificar Estado'
      rutaToCheck='empresa.estados.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormEstados
        initialValues={{
          iD_ESTADO: data?.dato?.iD_ESTADO,
          nombrE_ESTADO: data?.dato?.nombrE_ESTADO,
          clavE_ESTADO: data?.dato?.clavE_ESTADO,
          comentario: data?.dato?.comentario,
          estatus: data?.dato?.estatus
        }}
        url='estados'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
