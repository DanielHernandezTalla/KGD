'use client';
import { FormArticulos } from '@/components/forms/const_articulos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { useRequestImages } from '@/hooks/useRequestImages';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function ArticulosSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'articulos.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`articulos/${params.id}`);
  const {
    data: dataImage,
    isLoading: isLoadingImage,
    isError: isErrorImage
  }: IDataResponse<any> = useRequestImages(`articulos/archivodescarga`, {
    ID_ITEM: 1
  });

  console.log('articulos pa');
  console.log(dataImage);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar artículo'
      rutaToCheck='articulos.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormArticulos
        initialValues={{
          iD_ITEM: data?.dato?.iD_ITEM,
          item: data?.dato?.item,
          descripcion: data?.dato?.descripcion,
          iD_UOM_PRIMARIA: data?.dato?.iD_UOM_PRIMARIA,
          iD_CATEGORIA: data?.dato?.iD_CATEGORIA,
          transF_INVENTARIOS: data?.dato?.transF_INVENTARIOS,
          controL_MAX_MIX: data?.dato?.controL_MAX_MIX,
          inV_MINIMO: data?.dato?.inV_MINIMO === 0 ? '' : data?.dato?.inV_MINIMO,
          inV_MAXIMO: data?.dato?.inV_MAXIMO === 0 ? '' : data?.dato?.inV_MAXIMO,
          activO_FIJO: data?.dato?.activO_FIJO,
          iD_CATEGORIA_ACTIVO:
            data?.dato?.iD_CATEGORIA_ACTIVO === 0 ? undefined : data?.dato?.iD_CATEGORIA_ACTIVO,
          codigO_SAT: data?.dato?.codigO_SAT,
          estatus: data?.dato?.estatus
        }}
        url='articulos'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />

      <div id='imagen-container'></div>
    </FormLayout>
  );
}
