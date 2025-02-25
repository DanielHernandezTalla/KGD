'use client';
import { FormTipoSalario } from '@/components/forms/const_tipoSalario';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function TipoSalarioSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'personal.tiposalario.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tiposalario/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar tipo de salario'
      rutaToCheck='personal.tiposalario.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormTipoSalario
        initialValues={{
          iD_TIPO_SALARIO: data?.dato?.iD_TIPO_SALARIO,
          tipO_SALARIO: data?.dato?.tipO_SALARIO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tiposalario'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
