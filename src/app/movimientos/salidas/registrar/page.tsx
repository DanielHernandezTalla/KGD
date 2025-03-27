'use client';
import { FormSalida } from '@/components/forms/const_salida';
import { FormSalidaDetalle } from '@/components/forms/const_salidaDetalle';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusSalida() {
  return (
    <FormLayout title='Registrar Salida' rutaToCheck='SalidasCabecera.save'>
      <FormSalida
        initialValues={{
          // iD_SALIDA: '',
          // referencia: '',
          descripcion: '',
          iD_ALMACEN: '',
          fechA_SALIDA: new Date().toISOString().split('T')[0],
          iD_PROVEEDOR: null,
          iD_TIPO_TRANSACCION: '',
          iD_SALIDA_ESTATUS: 1
        }}
        url='SalidasCabecera'
      />
    </FormLayout>
  );
}
