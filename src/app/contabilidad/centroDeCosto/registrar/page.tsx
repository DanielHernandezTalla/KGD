'use client';
import { FormCentroDeCosto } from '@/components/forms/const_centroDeCosto';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarCentroDeCosto() {
  return (
    <FormLayout title='Registrar centro de costo'>
      <FormCentroDeCosto
        initialValues={{
          descripcion: '',
          segmentO3: '',
          estatus: true
        }}
        url='centrocosto'
      />
    </FormLayout>
  );
}
