'use client';
import { FormAlmacenes } from '@/components/forms/const_almacen';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AlmacenSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'contabilidad.almacenes.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data: user } = useSession();
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`almacen/${params.id}`);
  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar almacen'
      rutaToCheck='contabilidad.almacenes.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormAlmacenes
        initialValues={{
          iD_ALMACEN: data?.dato?.iD_ALMACEN,
          almacen: data?.dato?.almacen,
          descripcion: data?.dato?.descripcion,
          iD_CENTRO_COSTO: data?.dato?.iD_CENTRO_COSTO,
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
