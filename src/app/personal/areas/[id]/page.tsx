'use client';
import { FormArea } from '@/components/forms/const_area';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function AreaSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`areas/${params.id}`);

  return (
    <FormLayout title='Modificar Area' isLoading={isLoading} isError={isError}>
      <FormArea
        initialValues={{
          iD_AREA: data?.dato?.iD_AREA,
          area: data?.dato?.area,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='areas'
        isEditForm={true}
      />
    </FormLayout>
  );
}
