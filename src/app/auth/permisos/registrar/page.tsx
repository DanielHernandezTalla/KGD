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
          title: '',
          routE_NAME: '',
          icon: '',
          iS_LINK: false,
          estatus: true
        }}
        url='permisos'
      />
    </FormLayout>
  );
}
