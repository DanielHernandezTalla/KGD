'use client';
import { FormTipoPersonal } from '@/components/forms/const_tipoPersonal';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoPersonal() {
  return (
    <FormLayout title='Registrar Tipo Personal'>
      <FormTipoPersonal
        initialValues={{
          tipO_PERSONAL: '',
          descripcion: '',
          estatus: true
        }}
        url='tipopersonal'
      />
    </FormLayout>
  );
}
