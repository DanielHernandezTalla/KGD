'use client';
import { FormCiudades } from '@/components/forms/const_ciudades';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EstadosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`ciudad/${params.id}`);

  return (
    <FormLayout title='Modificar Ciudad' isLoading={isLoading} isError={isError}>
      <FormCiudades
        initialValues={{
          iD_CIUDAD: data?.dato?.iD_CIUDAD,
          nombrE_CIUDAD: data?.dato?.nombrE_CIUDAD,
          iD_ESTADO: data?.dato?.iD_ESTADO,
          estatus: data?.dato?.estatus
        }}
        url='ciudad'
        isEditForm={true}
      />
    </FormLayout>
  );
}