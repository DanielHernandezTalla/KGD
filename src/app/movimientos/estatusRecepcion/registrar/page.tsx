'use client';
import { FormEstatusRecepcion } from '@/components/forms/const_estatusRecepcion';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusRecepcion() {
  return (
    <FormLayout title='Registrar Estatus Recepción' rutaToCheck='RecepcionEstatus.save'>
      <FormEstatusRecepcion
        initialValues={{
          // iD_RECEPCION_ESTATUS: '',
          recepcioN_ESTATUS: '',
          descripcion: '',
          estatus: true
        }}
        url='RecepcionEstatus'
      />
    </FormLayout>
  );
}
