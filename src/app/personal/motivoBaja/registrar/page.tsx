'use client';
import { FormMotivoBaja } from '@/components/forms/const_motivoBaja';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarMotivoBaja() {
  return (
    <FormLayout title='Registrar motivo baja' rutaToCheck='personal.motivobaja.store'>
      <FormMotivoBaja
        initialValues={{
          motivO_BAJA: '',
          descripcion: '',
          estatus: true
        }}
        url='motivobaja'
      />
    </FormLayout>
  );
}
