'use client';
import { FormSucursales } from '@/components/forms/const_sucursales';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function SucursalesSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`sucursal/${params.id}`);

  return (
    <FormLayout title='Modificar Sucursales' isLoading={isLoading} isError={isError}>
      <FormSucursales
        initialValues={{
          iD_SUCURSAL: data?.dato?.iD_SUCURSAL,
          nombrE_SUCURSAL: data?.dato?.nombrE_SUCURSAL,
          iD_EMPRESA: data?.dato?.iD_EMPRESA,
          direccion: data?.dato?.direccion,
          segmentO2: data?.dato?.segmentO2,
          estatus: data?.dato?.estatus
        }}
        url='sucursal'
        isEditForm={true}
      />
    </FormLayout>
  );
}
