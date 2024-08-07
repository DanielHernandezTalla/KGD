'use client';
import { FormUbicaciones } from '@/components/forms/ubicaciones';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function UbicacionSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`location/${params.id}`);
  // console.log(data);
  return (
    <FormLayout title='Modificar Ubicación' isLoading={isLoading} isError={isError}>
      <FormUbicaciones
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='location'
        isEditForm={true}
      />
    </FormLayout>
  );
}
