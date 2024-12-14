'use client';
import { FormCategoriaArticulos } from '@/components/forms/const_categoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarCategoria() {
  return (
    <FormLayout title='Registrar categoría' rutaToCheck='articulos.categorias.store'>
      <FormCategoriaArticulos
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
