'use client';
import { FormPermisos } from '@/components/forms/const_permisos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function PermisoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`permisos/${params.id}`);

  console.log('=======XXXXXXXXXXXXXX');
  console.log(data);

  return (
    <FormLayout title='Modificar permiso' isLoading={isLoading} isError={isError}>
      <FormPermisos
        initialValues={{
          iD_PERMISO: data?.dato?.iD_PERMISO,
          permiso: data?.dato?.permiso,
          typepermissionS_ID: data?.dato?.typepermissionS_ID,
          title: data?.dato?.title,
          routE_NAME: data?.dato?.routE_NAME,
          icon: data?.dato?.icon,
          iS_LINK: data?.dato?.iS_LINK,
          estatus: data?.dato?.estatus
        }}
        url='permisos'
        isEditForm={true}
      />
    </FormLayout>
  );
}
