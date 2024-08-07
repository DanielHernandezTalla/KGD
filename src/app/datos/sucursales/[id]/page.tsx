'use client';
import { FormSucursales } from '@/components/forms/sucursales';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function SucursalSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`sucursales/${params.id}`);

  return (
    <FormLayout title='Modificar Sucursal' isLoading={isLoading} isError={isError}>
      <FormSucursales
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='sucursales'
        isEditForm={true}
      />
    </FormLayout>
  );
}
