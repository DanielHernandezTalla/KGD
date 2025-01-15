// 1. Importaciones de dependencias externas
// 2. Importaciones de módulos internos
// 3. Importaciones de componentes
// 4. Importaciones de interfaces y tipos
'use client';
import { useEffect, useState } from 'react';
import { useRequest } from '@/hooks/useRequest';
import { handrePermisos } from '@/utils/handlePermisos';
import { FormAlmacenes } from '@/components/forms/const_almacen';
import { FormLayout } from '@/components/molecules/FormLayout';
import { IDataResponse } from '@/interface/request';

export default function AlmacenSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'almacen.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`almacen/${params.id}`);

  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar almacen'
      rutaToCheck='almacen.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormAlmacenes
        initialValues={{
          iD_ALMACEN: data?.dato?.iD_ALMACEN,
          almacen: data?.dato?.almacen,
          descripcion: data?.dato?.descripcion,
          iD_CENTRO_COSTO: data?.dato?.iD_CENTRO_COSTO,
          iD_SUCURSAL: data?.dato?.iD_SUCURSAL,
          iD_ESTADO: data?.dato?.iD_ESTADO,
          iD_CIUDAD: data?.dato?.iD_CIUDAD,
          iD_ENCARGADO: data?.dato?.iD_ENCARGADO,
          estatus: data?.dato?.estatus
        }}
        url={`almacen`}
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
