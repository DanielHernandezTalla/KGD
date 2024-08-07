'use client';
import { FormSucursales } from '@/components/forms/sucursales';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarSucursal = () => {
  return (
    <FormLayout title='Registrar Sucursal'>
      <FormSucursales
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='sucursales'
      />
    </FormLayout>
  );
};

export default RegistrarSucursal;
