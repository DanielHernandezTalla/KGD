'use client';
import { FormEmpresas } from '@/components/forms/const_empresas';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EstadosSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'empresa.empresas.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`empresas/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar Empresa'
      rutaToCheck='empresa.empresas.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormEmpresas
        initialValues={{
          iD_EMPRESA: data?.dato?.iD_EMPRESA,
          razoN_SOCIAL: data?.dato?.razoN_SOCIAL,
          rfc: data?.dato?.rfc,
          direccion: data?.dato?.direccion,
          telefono: data?.dato?.telefono,
          iD_CIUDAD: data?.dato?.iD_CIUDAD,
          iD_ESTADO: data?.dato?.iD_ESTADO,
          codigO_POSTAL: data?.dato?.codigO_POSTAL,
          segmentO1: data?.dato?.segmentO1,
          estatus: data?.dato?.estatus
        }}
        url='empresas'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
