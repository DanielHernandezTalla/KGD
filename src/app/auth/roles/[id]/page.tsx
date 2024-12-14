'use client';
import { FormRoles } from '@/components/forms/const_roles';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function RolSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'auth.roles.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`roles/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar rol'
      rutaToCheck='auth.roles.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormRoles
        initialValues={{
          id: data?.dato?.iD_ROLE,
          name: data?.dato?.role,
          estatus: data?.dato?.estatus
        }}
        url='roles'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
