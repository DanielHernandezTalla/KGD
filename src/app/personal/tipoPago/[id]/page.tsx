'use client';
import { FormTipoPago } from '@/components/forms/const_tipoPago';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function TipoPagoSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'personal.tipopago.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tipopago/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar tipo de pago'
      rutaToCheck='personal.tipopago.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormTipoPago
        initialValues={{
          iD_TIPO_PAGO: data?.dato?.iD_TIPO_PAGO,
          tipO_PAGO: data?.dato?.tipO_PAGO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipopago'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
