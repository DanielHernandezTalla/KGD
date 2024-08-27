'use client';
import { FormCategoriaActivos } from '@/components/forms/const_categoriaActivos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function CategoriaActivoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `articuloscategoriaact/${params.id}`
  );

  return (
    <FormLayout title='Modificar categoría activo' isLoading={isLoading} isError={isError}>
      <FormCategoriaActivos
        initialValues={{
          iD_ACTIVOS: data?.dato?.iD_ACTIVOS,
          activo: data?.dato?.activo,
          descripcion: data?.dato?.descripcion,
          tiempO_DEPRECIACION_YEAR: data?.dato?.tiempO_DEPRECIACION_YEAR,
          estatus: data?.dato?.estatus
        }}
        url='articuloscategoriaact'
        isEditForm={true}
      />
    </FormLayout>
  );
}
