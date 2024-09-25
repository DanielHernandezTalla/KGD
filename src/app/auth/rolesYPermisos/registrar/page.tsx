'use client';
import { FormRolesYPermisos } from '@/components/forms/const_rolesYPermisos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarRol() {
  return (
    <FormLayout title='Registrar rol y permiso'>
      <FormRolesYPermisos
        initialValues={{
          iD_ROLES: '',
          iD_PERMISO: ''
        }}
        url='rolespermiso'
      />
    </FormLayout>
  );
}
