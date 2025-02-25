'use client';
import { FormTipoPago } from '@/components/forms/const_tipoPago';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoPago() {
  return (
    <FormLayout title='Registrar tipo pago' rutaToCheck='personal.tipopago.store'>
      <FormTipoPago
        initialValues={{
          tipO_PAGO: '',
          descripcion: '',
          estatus: true
        }}
        url='tipopago'
      />
    </FormLayout>
  );
}
