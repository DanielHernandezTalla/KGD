'use client';
import { FormTipoTransaccion } from '@/components/forms/const_tipoTransaccion';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoTransaccion() {
  return (
    <FormLayout title='Registrar tipo transaccion'>
      <FormTipoTransaccion
        initialValues={{
          tipO_TRANSACCION: '',
          descripcion: '',
          estatus: true
        }}
        url='tipotransaccion'
      />
    </FormLayout>
  );
}
