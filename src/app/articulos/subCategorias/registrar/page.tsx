'use client';
import { FormSubcategoriaArticulos } from '@/components/forms/const_subcategoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarCategoria() {
  return (
    <FormLayout title='Registrar subcategoría' rutaToCheck='articuloscategorias.save'>
      <FormSubcategoriaArticulos
        initialValues={{
          categoriA_ARTICULOS: '',
          descripcion: '',
          estatus: true
        }}
        url='articuloscategorias'
      />
    </FormLayout>
  );
}
