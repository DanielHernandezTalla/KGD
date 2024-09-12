'use client';
import { FormPermisos } from '@/components/forms/const_permisos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function PermisoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`permisos/${params.id}`);

  console.log(data);

  return (
    <FormLayout title='Modificar permiso' isLoading={isLoading} isError={isError}>
      <FormPermisos
        initialValues={{
          id: data?.dato?.id,
          name: data?.dato?.name,
          typE_PERMISSIONS_ID: data?.dato?.typE_PERMISSIONS_ID,
          estatus: data?.dato?.estatus
        }}
        url='permisos'
        isEditForm={true}
      />
    </FormLayout>
  );
}
