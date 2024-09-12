'use client';
import { FormPermisos } from '@/components/forms/const_permisos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarPermiso() {
  return (
    <FormLayout title='Registrar permiso'>
      <FormPermisos
        initialValues={{
          name: '',
          typE_PERMISSIONS_ID: '',
          estatus: true
        }}
        url='permisos'
      />
    </FormLayout>
  );
}
