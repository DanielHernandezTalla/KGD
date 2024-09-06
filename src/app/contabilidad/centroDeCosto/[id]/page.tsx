'use client';
import { FormCentroDeCosto } from '@/components/forms/const_centroDeCosto';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function CentroDeCostoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`centrocosto/${params.id}`);

  return (
    <FormLayout title='Modificar centro de costo' isLoading={isLoading} isError={isError}>
      <FormCentroDeCosto
        initialValues={{
          iD_CENTRO_COSTO: data?.dato?.iD_CENTRO_COSTO,
          segmentO3: data?.dato?.segmentO3,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='centrocosto'
        isEditForm={true}
      />
    </FormLayout>
  );
}
