'use client';
import { FormCategoriaArticulos } from '@/components/forms/const_categoriaArticulos';
import { FormSubcategoriaArticulos } from '@/components/forms/const_subcategoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function CategoriasSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'articuloscategorias.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `articuloscategorias/${params.id}`
  );

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar subcategoría'
      rutaToCheck='articuloscategorias.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormSubcategoriaArticulos
        initialValues={{
          iD_CATEGORIA_ARTICULOS: data?.dato?.iD_CATEGORIA_ARTICULOS,
          categoriA_ARTICULOS: data?.dato?.categoriA_ARTICULOS,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='articuloscategorias'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
