'use client';
import { FormTiposPermisos } from '@/components/forms/const_toposDePermisos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function TipoPermisoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tipopermisos/${params.id}`);

  return (
    <FormLayout title='Modificar tipo de permiso' isLoading={isLoading} isError={isError}>
      <FormTiposPermisos
        initialValues={{
          id: data?.dato?.id,
          name: data?.dato?.name,
          estatus: data?.dato?.estatus
        }}
        url='tipopermisos'
        isEditForm={true}
      />
    </FormLayout>
  );
}
