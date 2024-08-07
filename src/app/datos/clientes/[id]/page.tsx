'use client';
import { Toast } from '@/components/atoms';
import { FormClientes } from '@/components/forms/clientes';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function ClienteSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`clientes/${params.id}`);
  return (
    <FormLayout title='Modificar Cliente' isLoading={isLoading} isError={isError}>
      <FormClientes
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          tipo_de_cliente_id: data?.data?.tipo_de_cliente_id,
          activo: data?.data?.activo
        }}
        url='clientes'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
