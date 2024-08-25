'use client';
import { FormTipoPago } from '@/components/forms/const_tipoPago';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoPagoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tipopago/${params.id}`);

  return (
    <FormLayout title='Modificar tipo de pago' isLoading={isLoading} isError={isError}>
      <FormTipoPago
        initialValues={{
          iD_TIPO_PAGO: data?.dato?.iD_TIPO_PAGO,
          tipO_PAGO: data?.dato?.tipO_PAGO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipopago'
        isEditForm={true}
      />
    </FormLayout>
  );
}
