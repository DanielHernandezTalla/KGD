'use client';
import { FormTipoDeEvento } from '@/components/forms/const_tipoDeEvento';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarRol() {
  return (
    <FormLayout title='Registrar tipo de evento'>
      <FormTipoDeEvento
        initialValues={{
          nombre: ''
        }}
        url='tipopermisodet'
      />
    </FormLayout>
  );
}
