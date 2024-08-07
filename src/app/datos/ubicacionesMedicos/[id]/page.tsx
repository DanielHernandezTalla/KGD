'use client';
import { FormUbicaciones } from '@/components/forms/ubicaciones';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function UbicacionSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `ubicacionesmedicos/${params.id}`
  );
  return (
    <FormLayout title='Modificar Ubicación Medicos' isLoading={isLoading} isError={isError}>
      <FormUbicaciones
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='ubicacionesmedicos'
        isEditForm={true}
      />
    </FormLayout>
  );
}
