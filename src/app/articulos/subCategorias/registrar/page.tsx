'use client';
import { FormSubcategoriaArticulos } from '@/components/forms/const_subcategoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarSubcategoria() {
  return (
    <FormLayout title='Registrar subcategoría' rutaToCheck='articulossubcategoria.save'>
      <FormSubcategoriaArticulos
        initialValues={{
          subcategoriA_ARTICULOS: '',
          descripcion: '',
          estatus: true
        }}
        url='articulossubcategoria'
      />
    </FormLayout>
  );
}
