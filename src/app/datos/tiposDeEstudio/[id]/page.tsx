'use client';
import { Toast } from '@/components/atoms';
import { FormTiposDeEstudios } from '@/components/forms/tiposDeEstudios';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoDeEstudioSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `tiposdeestudios/${params.id}`
  );
  return (
    <FormLayout title='Modificar Tipo De Estudio' isLoading={isLoading} isError={isError}>
      <FormTiposDeEstudios
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='tiposdeestudios'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
