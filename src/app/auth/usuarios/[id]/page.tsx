'use client';
import { FormUsuarios } from '@/components/forms/const_usuarios';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function UsuarioSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`usuarios/${params.id}`);

  return (
    <FormLayout title='Modificar usuario' isLoading={isLoading} isError={isError}>
      <FormUsuarios
        initialValues={{
          id: data?.dato?.id,
          name: data?.dato?.name,
          email: data?.dato?.email,
          password: data?.dato?.password || '',
          estatus: data?.dato?.estatus
        }}
        url='usuarios'
        isEditForm={true}
      />
    </FormLayout>
  );
}
