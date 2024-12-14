'use client';
import { FormTipoTransaccion } from '@/components/forms/const_tipoTransaccion';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function CategoriasSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'articulos.transacciones.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `tipotransaccion/${params.id}`
  );

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar tipo de transacción'
      rutaToCheck='articulos.transacciones.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormTipoTransaccion
        initialValues={{
          iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
          tipO_TRANSACCION: data?.dato?.tipO_TRANSACCION,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipotransaccion'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
