'use client';
import { Toast } from '@/components/atoms';
import { FormEstatusMedico } from '@/components/forms/estatusMedico';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EstatusMedicoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`estatusmedico/${params.id}`);
  return (
    <FormLayout title='Modificar Estatus Médico' isLoading={isLoading} isError={isError}>
      <FormEstatusMedico
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='estatusmedico'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
