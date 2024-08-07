'use client';
import { FormMedicos } from '@/components/forms/medicos';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarMedico = () => {
  return (
    <FormLayout title='Registrar Médico'>
      <FormMedicos
        initialValues={{
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          estatus_medico_id: '',
          ubicaciones_de_medico_id: '',
          celular: '',
          activo: true
        }}
        url='medicosremitentes'
      />
    </FormLayout>
  );
};

export default RegistrarMedico;
