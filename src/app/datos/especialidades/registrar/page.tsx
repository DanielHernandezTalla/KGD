'use client';
import { FormEspecialidades } from '@/components/forms/especialidades';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarEspecialidad = () => {
  return (
    <FormLayout title='Registrar Especialidad'>
      <FormEspecialidades
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='especialidades'
      />
    </FormLayout>
  );
};

export default RegistrarEspecialidad;
