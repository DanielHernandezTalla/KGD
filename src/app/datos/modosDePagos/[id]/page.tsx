'use client';
import { Toast } from '@/components/atoms';
import { FormModosDePago } from '@/components/forms/modosDePago';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function ModosDePagosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`modosdepago/${params.id}`);
  return (
    <FormLayout title='Modificar Modo De Pago' isLoading={isLoading} isError={isError}>
      <FormModosDePago
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='modosdepago'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
