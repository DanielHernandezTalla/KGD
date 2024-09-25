'use client';
import { FormRolesYPermisos } from '@/components/forms/const_rolesYPermisos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function RolSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`rolespermiso/${params.id}`);

  console.log(data);

  return (
    <FormLayout title='Modificar rol y permiso' isLoading={isLoading} isError={isError}>
      <FormRolesYPermisos
        initialValues={{
          id: data?.dato?.id,
          iD_ROLES: data?.dato?.iD_ROLES,
          iD_PERMISO: data?.dato?.iD_PERMISO
        }}
        url='rolespermiso'
        isEditForm={true}
      />
    </FormLayout>
  );
}
