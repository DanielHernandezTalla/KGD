'use client';
import { Toast } from '@/components/atoms';
import { FormEspecialidades } from '@/components/forms/especialidades';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EspecialidadSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `especialidades/${params.id}`
  );
  return (
    <FormLayout title='Modificar Especialidad' isLoading={isLoading} isError={isError}>
      <FormEspecialidades
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='especialidades'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
