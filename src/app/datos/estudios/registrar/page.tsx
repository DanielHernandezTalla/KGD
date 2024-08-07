'use client';
import { FormEstudios } from '@/components/forms/estudios';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarEstudios = () => {
  return (
    <FormLayout title='Registrar Estudio'>
      <FormEstudios
        initialValues={{
          nombre: '',
          productividad: 0,
          requiere_medico: false,
          requiere_tecnico: false,
          activo: true
        }}
        url='estudios'
      />
    </FormLayout>
  );
};

export default RegistrarEstudios;
