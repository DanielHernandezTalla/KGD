'use client';
import { FormEstatusMedico } from '@/components/forms/estatusMedico';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusMedico() {
  return (
    <FormLayout title='Registrar Estatus Médico'>
      <FormEstatusMedico
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='estatusmedico'
      />
    </FormLayout>
  );
}
