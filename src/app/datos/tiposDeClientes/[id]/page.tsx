'use client';
import { Toast } from '@/components/atoms';
import { FormTiposDeClientes } from '@/components/forms/tiposDeClientes';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoDeClienteSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `tiposdeclientes/${params.id}`
  );
  return (
    <FormLayout title='Modificar Tipo De Cliente' isLoading={isLoading} isError={isError}>
      <FormTiposDeClientes
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='tiposdeclientes'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
