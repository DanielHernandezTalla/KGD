'use client';
import { FormCategoriaArticulos } from '@/components/forms/const_categoriaArticulos';
import { FormSubcategoriaArticulos } from '@/components/forms/const_subcategoriaArticulos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function SubcategoriasSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'articulossubcategoria.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `articulossubcategoria/${params.id}`
  );

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar subcategoría'
      rutaToCheck='articulossubcategoria.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormSubcategoriaArticulos
        initialValues={{
          iD_SUBCATEGORIA_ARTICULOS: data?.dato?.iD_SUBCATEGORIA_ARTICULOS || '',
          subcategoriA_ARTICULOS: data?.dato?.subcategoriA_ARTICULOS || '',
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='articulossubcategoria'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
