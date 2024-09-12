'use client';
import { FormRoles } from '@/components/forms/const_roles';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarRol() {
  return (
    <FormLayout title='Registrar rol'>
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
