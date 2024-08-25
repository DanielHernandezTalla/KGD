'use client';
import { FormTipoSalario } from '@/components/forms/const_tipoSalario';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoSalarioSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tiposalario/${params.id}`);

  return (
    <FormLayout title='Modificar tipo de salario' isLoading={isLoading} isError={isError}>
      <FormTipoSalario
        initialValues={{
          iD_TIPO_SALARIO: data?.dato?.iD_TIPO_SALARIO,
          tipO_SALARIO: data?.dato?.tipO_SALARIO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tiposalario'
        isEditForm={true}
      />
    </FormLayout>
  );
}
