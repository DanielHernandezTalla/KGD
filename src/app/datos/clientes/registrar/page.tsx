'use client';
import { FormClientes } from '@/components/forms/clientes';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarCliente = () => {
  return (
    <FormLayout title='Registrar Clientes'>
      <FormClientes
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='clientes'
      />
    </FormLayout>
  );
};

export default RegistrarCliente;
