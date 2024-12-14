'use client';
import { FormRoles } from '@/components/forms/const_roles';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarRol() {
  return (
    <FormLayout title='Registrar rol' rutaToCheck='auth.roles.store'>
      <FormRoles
        initialValues={{
          name: '',
          estatus: true
        }}
        url='roles'
      />
    </FormLayout>
  );
}
