'use client';
import { FormTiposPermisos } from '@/components/forms/const_toposDePermisos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarRol() {
  return (
    <FormLayout title='Registrar tipo de permiso'>
      <FormTiposPermisos
        initialValues={{
          name: '',
          estatus: true
        }}
        url='tipopermisos'
      />
    </FormLayout>
  );
}
