'use client';
import { FormSucursales } from '@/components/forms/const_sucursales';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarSucursales() {
  return (
    <FormLayout title='Registrar Sucursales' rutaToCheck='empresa.sucursales.store'>
      <FormSucursales
        initialValues={{
          nombrE_SUCURSAL: '',
          iD_EMPRESA: '',
          direccion: '',
          segmentO2: '',
          estatus: true
        }}
        url='sucursal'
      />
    </FormLayout>
  );
}
