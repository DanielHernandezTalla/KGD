'use client';
import { Toast } from '@/components/atoms';
import { FormDescuentos } from '@/components/forms/descuentos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function DescuentosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`descuentos/${params.id}`);
  return (
    <FormLayout title='Modificar Descuento' isLoading={isLoading} isError={isError}>
      <FormDescuentos
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          cantidad: data?.data?.cantidad,
          es_porcentaje: data?.data?.es_porcentaje,
          activo: data?.data?.activo
        }}
        url='descuentos'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
