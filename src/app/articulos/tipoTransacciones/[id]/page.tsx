'use client';
import { FormTipoTransaccion } from '@/components/forms/const_tipoTransaccion';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function CategoriasSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `tipotransaccion/${params.id}`
  );

  return (
    <FormLayout title='Modificar tipo de transacción' isLoading={isLoading} isError={isError}>
      <FormTipoTransaccion
        initialValues={{
          iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
          tipO_TRANSACCION: data?.dato?.tipO_TRANSACCION,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipotransaccion'
        isEditForm={true}
      />
    </FormLayout>
  );
}
