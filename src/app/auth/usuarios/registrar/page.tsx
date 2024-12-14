'use client';
import { FormUsuarios } from '@/components/forms/const_usuarios';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarUsuario() {
  return (
    <FormLayout title='Registrar usuario' rutaToCheck='auth.usuarios.store'>
      <FormUsuarios
        initialValues={{
          name: '',
          email: '',
          id_rol: '',
          password: '',
          estatus: true
        }}
        url='usuarios'
      />
    </FormLayout>
  );
}
