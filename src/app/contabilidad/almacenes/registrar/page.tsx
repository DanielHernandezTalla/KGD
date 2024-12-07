'use client';
import { FormAlmacenes } from '@/components/forms/const_almacen';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useSession } from 'next-auth/react';

export default function RegistrarAlmacen() {
  const { data: user } = useSession();
  return (
    <FormLayout title='Registrar Almacen'>
      <FormAlmacenes
        initialValues={{
          almacen: '',
          descripcion: '',
          iD_CENTRO_COSTO: '',
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
