'use client';
import { FormTiposDeClientes } from '@/components/forms/tiposDeClientes';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoDeCliente() {
  return (
    <FormLayout title='Registrar Tipo De Cliente'>
      <FormTiposDeClientes
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='tiposdeclientes'
      />
    </FormLayout>
  );
}
