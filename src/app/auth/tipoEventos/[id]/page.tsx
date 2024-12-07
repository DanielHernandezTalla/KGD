'use client';
import { FormTipoDeEvento } from '@/components/forms/const_tipoDeEvento';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoPermisoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `tipopermisodet/${params.id}`
  );

  console.log(data);

  return (
    <FormLayout title='Modificar tipo de evento' isLoading={isLoading} isError={isError}>
      <FormTipoDeEvento
        initialValues={{
          id: data?.dato?.id,
          nombre: data?.dato?.nombre
        }}
        url='tipopermisodet'
        isEditForm={true}
      />
    </FormLayout>
  );
}
