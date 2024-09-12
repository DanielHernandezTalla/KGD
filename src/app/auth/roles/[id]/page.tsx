'use client';
import { FormRoles } from '@/components/forms/const_roles';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function RolSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`roles/${params.id}`);

  return (
    <FormLayout title='Modificar rol' isLoading={isLoading} isError={isError}>
      <FormRoles
        initialValues={{
          id: data?.dato?.id,
          name: data?.dato?.name,
          estatus: data?.dato?.estatus
        }}
        url='roles'
        isEditForm={true}
      />
    </FormLayout>
  );
}
