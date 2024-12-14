'use client';
import { FormCentroDeCosto } from '@/components/forms/const_centroDeCosto';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function CentroDeCostoSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'contabilidad.cc.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`centrocosto/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar centro de costo'
      rutaToCheck='contabilidad.cc.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormCentroDeCosto
        initialValues={{
          iD_CENTRO_COSTO: data?.dato?.iD_CENTRO_COSTO,
          segmentO3: data?.dato?.segmentO3,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='centrocosto'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
