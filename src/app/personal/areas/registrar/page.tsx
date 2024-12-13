'use client';
import { FormArea } from '@/components/forms/const_area';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarArea() {
  return (
    <FormLayout title='Registrar Area' rutaToCheck='personal.areas.store'>
      <FormArea
        initialValues={{
          area: '',
          descripcion: '',
          estatus: true
        }}
        url='areas'
      />
    </FormLayout>
  );
}
