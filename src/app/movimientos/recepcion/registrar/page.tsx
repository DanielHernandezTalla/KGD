'use client';
import { FormRecepcion } from '@/components/forms/const_recepcion';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstatusSalida() {
  return (
    <FormLayout title='Registrar Recepción' rutaToCheck='movimientos.recepcion.store'>
      <FormRecepcion
        initialValues={{
          // iD_RECEPCION: '',
          referencia: '',
          descripcion: '',
          iD_ALMACEN: '',
          fechA_RECEPCION: '',
          iD_PROVEEDOR: null,
          iD_TIPO_TRANSACCION: '',
          iD_RECEPCION_ESTATUS: 1
        }}
        url='RecepcionCabecera'
      />
    </FormLayout>
  );
}
