'use client';
import { FormUsuarios } from '@/components/forms/const_usuarios';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarUsuario() {
  return (
    <FormLayout title='Registrar usuario'>
      <FormUsuarios
        initialValues={{
          name: '',
          email: '',
          password: '',
          estatus: true
        }}
        url='usuarios'
      />
    </FormLayout>
  );
}
