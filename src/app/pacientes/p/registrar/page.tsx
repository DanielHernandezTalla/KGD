'use client';
import { FormPacientes } from '@/components/forms/pacientes';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarEstudios = () => {
  return (
    <FormLayout title='Registrar Paciente'>
      <FormPacientes
        initialValues={{
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          fecha_nacimiento: '',
          celular: '',
          correo: '',
          activo: true
        }}
        url='pacientes'
      />
    </FormLayout>
  );
};

export default RegistrarEstudios;
