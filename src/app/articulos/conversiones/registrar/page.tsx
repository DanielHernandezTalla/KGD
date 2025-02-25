'use client';
import { FormConversionesArticulos } from '@/components/forms/const_conversionesDeArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarConversion() {
  return (
    <FormLayout title='Registrar conversion de artículo' rutaToCheck='conversiones.save'>
      <FormConversionesArticulos
        initialValues={{
          iD_ITEM: '',
          iD_UOM_ORIGEN: '',
          iD_UOM_DESTINO: '',
          cantidaD_ORIGEN: '',
          cantidaD_DESTINO: '',
          descripcion: '',
          estatus: true
        }}
        url='conversiones'
      />
    </FormLayout>
  );
}
