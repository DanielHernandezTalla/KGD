'use client';
import { FormReferenciasPaciente } from '@/components/forms/referenciasPaciente';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarUbicacion = () => {
  return (
    <FormLayout title='Registrar Referencia Paciente'>
      <FormReferenciasPaciente
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='referenciaspaciete'
      />
    </FormLayout>
  );
};

export default RegistrarUbicacion;
