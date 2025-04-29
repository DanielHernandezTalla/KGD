'use client';
import { FormRecepcion } from '@/components/forms/const_recepcion';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusSalida() {
  return (
    <FormLayout title='Registrar Recepción' rutaToCheck='RecepcionCabecera.save'>
      <FormRecepcion
        initialValues={{
          // iD_RECEPCION: '',
          chofer: '',
          referencia: '',
          descripcion: '',
          iD_ALMACEN: '',
          fechA_RECEPCION: '',
          iD_PROVEEDOR: null,
          iD_TIPO_TRANSACCION: 4,
          iD_RECEPCION_ESTATUS: 1
        }}
        url='RecepcionCabecera'
      />
    </FormLayout>
  );
}
