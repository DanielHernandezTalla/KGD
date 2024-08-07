'use client';
import { FormTiposDeEstudios } from '@/components/forms/tiposDeEstudios';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoDeEstudio() {
  return (
    <FormLayout title='Registrar Tipo De Estudio'>
      <FormTiposDeEstudios
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='tiposdeestudios'
      />
    </FormLayout>
  );
}
