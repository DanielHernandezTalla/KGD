'use client';
import { FormUbicaciones } from '@/components/forms/ubicaciones';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarUbicacion = () => {
  return (
    <FormLayout title='Registrar Ubicación'>
      <FormUbicaciones
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='location'
      />
    </FormLayout>
  );
};

export default RegistrarUbicacion;
