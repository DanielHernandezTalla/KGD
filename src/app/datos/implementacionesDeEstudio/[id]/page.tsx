'use client';
import { FormImplementacionesDeEST } from '@/components/forms/implementacionesDeEstudio';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function ImplementacionesDeEstudioSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `implementacionesestudios/${params.id}`
  );
  return (
    <FormLayout title='Modificar Implementación de Estudio' isLoading={isLoading} isError={isError}>
      <FormImplementacionesDeEST
        initialValues={{
          id: data?.data?.id,
          estudio_id: data?.data?.estudio_id,
          sucursales_id: data?.data?.sucursales_id,
          productividad: data?.data?.productividad ? data?.data?.productividad : '',
          activo: data?.data?.activo
        }}
        url='implementacionesestudios'
        isEditForm={true}
      />
    </FormLayout>
  );
}
