'use client';
import { FormMedicosEspecialidades } from '@/components/forms/medicosEspecialidades';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarMedicosEspecialidad = () => {
  return (
    <FormLayout title='Registrar Médico y Especialidad'>
      <FormMedicosEspecialidades
        initialValues={{
          medico_remitente_id: '',
          especialidad_id: '',
          activo: true
        }}
        url='medicosespecialidades'
      />
    </FormLayout>
  );
};

export default RegistrarMedicosEspecialidad;
