'use client';
import { FormEstatusSalida } from '@/components/forms/const_estatusSalida';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusSalida() {
  return (
    <FormLayout title='Registrar Estatus Salida' rutaToCheck='SalidaEstatus.save'>
      <FormEstatusSalida
        initialValues={{
          // iD_RECEPCION_ESTATUS: '',
          salidA_ESTATUS: '',
          descripcion: '',
          estatus: true
        }}
        url='SalidaEstatus'
      />
    </FormLayout>
  );
}
