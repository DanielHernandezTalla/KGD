'use client';
import { Toast } from '@/components/atoms';
import { FormEstudios } from '@/components/forms/estudios';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EstudiosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`estudios/${params.id}`);
  return (
    <FormLayout title='Modificar Estudio' isLoading={isLoading} isError={isError}>
      <FormEstudios
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          tipo_de_estudio_id: data?.data?.tipo_de_estudio_id,
          productividad: data?.data?.productividad,
          requiere_medico: data?.data?.requiere_medico,
          requiere_tecnico: data?.data?.requiere_tecnico,
          activo: data?.data?.activo
        }}
        url='estudios'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
