'use client';
import { FormUbicaciones } from '@/components/forms/ubicaciones';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarUbicacion = () => {
  return (
    <FormLayout title='Registrar Ubicación Medicos'>
      <FormUbicaciones
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='ubicacionesmedicos'
      />
    </FormLayout>
  );
};

export default RegistrarUbicacion;
