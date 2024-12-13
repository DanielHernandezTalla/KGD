'use client';
import { FormCiudades } from '@/components/forms/const_ciudades';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstados() {
  return (
    <FormLayout title='Registrar Ciudad'  rutaToCheck='empresa.ciudades.store'>
      <FormCiudades
        initialValues={{
          nombrE_CIUDAD: '',
          iD_ESTADO: '',
          estatus: true
        }}
        url='ciudad'
      />
    </FormLayout>
  );
}
