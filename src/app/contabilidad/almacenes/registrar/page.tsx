'use client';
import { FormAlmacenes } from '@/components/forms/const_almacen';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarAlmacen() {
  return (
    <FormLayout title='Registrar Almacen' rutaToCheck='almacen.save'>
      <FormAlmacenes
        initialValues={{
          almacen: '',
          descripcion: '',
          iD_CENTRO_COSTO: '',
          iD_SUCURSAL: '',
          iD_ESTADO: '',
          iD_CIUDAD: '',
          iD_ENCARGADO: '',
          estatus: true
        }}
        url={`almacen`}
      />
    </FormLayout>
  );
}
