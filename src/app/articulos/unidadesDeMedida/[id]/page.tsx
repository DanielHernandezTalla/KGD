'use client';
import { FormUnidadDeMedida } from '@/components/forms/const_unidadDeMedida';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function CategoriasSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`unidadmedida/${params.id}`);

  return (
    <FormLayout title='Modificar unidad de medida' isLoading={isLoading} isError={isError}>
      <FormUnidadDeMedida
        initialValues={{
          iD_UOM: data?.dato?.iD_UOM,
          unidaD_MEDIDA: data?.dato?.unidaD_MEDIDA,
          nombrE_CORTO: data?.dato?.nombrE_CORTO,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='unidadmedida'
        isEditForm={true}
      />
    </FormLayout>
  );
}
