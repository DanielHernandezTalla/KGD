'use client';
import { FormUnidadDeMedida } from '@/components/forms/const_unidadDeMedida';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarUnidadDeMedida() {
  return (
    <FormLayout title='Registrar unidad de medida' rutaToCheck='articulos.um.store'>
      <FormUnidadDeMedida
        initialValues={{
          unidaD_MEDIDA: '',
          nombrE_CORTO: '',
          descripcion: '',
          estatus: true
        }}
        url='unidadmedida'
      />
    </FormLayout>
  );
}
