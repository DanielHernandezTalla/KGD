'use client';
import { FormTipoPersonal } from '@/components/forms/const_tipoPersonal';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function SucursalesSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'tipopersonal.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tipopersonal/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar tipo de personal'
      rutaToCheck='tipopersonal.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormTipoPersonal
        initialValues={{
          iD_TIPO_PERSONAL: data?.dato?.iD_TIPO_PERSONAL,
          tipO_PERSONAL: data?.dato?.tipO_PERSONAL,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipopersonal'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
