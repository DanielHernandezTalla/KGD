'use client';
import { FormEstatusRecepcion } from '@/components/forms/const_estatusRecepcion';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EstatusRecepcionSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'movimientos.er.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `RecepcionEstatus/${params.id}`
  );

  return (
    <FormLayout
      title='Modificar Estatus Recepción'
      rutaToCheck='movimientos.er.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormEstatusRecepcion
        initialValues={{
          iD_RECEPCION_ESTATUS: data?.dato?.iD_RECEPCION_ESTATUS,
          recepcioN_ESTATUS: data?.dato?.recepcioN_ESTATUS,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='RecepcionEstatus'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
