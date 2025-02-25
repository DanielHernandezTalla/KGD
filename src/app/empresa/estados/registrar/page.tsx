'use client';
import { FormEstados } from '@/components/forms/const_estados';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstados() {
  return (
    <FormLayout title='Registrar Estados' rutaToCheck='estados.save'>
      <FormEstados
        initialValues={{
          nombrE_ESTADO: '',
          clavE_ESTADO: '',
          comentario: '',
          estatus: true
        }}
        url='estados'
      />
    </FormLayout>
  );
}
