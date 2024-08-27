'use client';
import { FormCategoriaArticulos } from '@/components/forms/const_categoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function CategoriasSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `articuloscategorias/${params.id}`
  );

  return (
    <FormLayout title='Modificar categoría' isLoading={isLoading} isError={isError}>
      <FormCategoriaArticulos
        initialValues={{
          iD_CATEGORIA_ARTICULOS: data?.dato?.iD_CATEGORIA_ARTICULOS,
          categoriA_ARTICULOS: data?.dato?.categoriA_ARTICULOS,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='articuloscategorias'
        isEditForm={true}
      />
    </FormLayout>
  );
}
