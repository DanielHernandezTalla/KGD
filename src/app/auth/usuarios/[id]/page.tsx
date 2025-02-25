'use client';
import { FormUsuarios } from '@/components/forms/const_usuarios';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function UsuarioSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'auth.usuarios.update';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`usuarios/${params.id}`);

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar usuario'
      rutaToCheck='auth.usuarios.show'
      isLoading={isLoading}
      isError={isError}
    >
      <FormUsuarios
        initialValues={{
          id: data?.dato?.id,
          name: data?.dato?.name,
          id_rol: data?.dato?.id_rol,
          iD_EMPLEADO: data?.dato?.iD_EMPLEADO,
          email: data?.dato?.email,
          password: data?.dato?.password || '',
          estatus: data?.dato?.estatus
        }}
        url='usuarios'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
