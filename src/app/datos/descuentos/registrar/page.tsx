'use client';
import { FormDescuentos } from '@/components/forms/descuentos';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarDescuento = () => {
  return (
    <FormLayout title='Registrar Descuetos'>
      <FormDescuentos
        initialValues={{
          nombre: '',
          cantidad: 0,
          es_porcentaje: false,
          activo: true
        }}
        url='descuentos'
      />
    </FormLayout>
  );
};

export default RegistrarDescuento;
