'use client';
import { Toast } from '@/components/atoms';
import { FormClientes } from '@/components/forms/clientes';
import { FormEstados } from '@/components/forms/const_estados';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EstadosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`estados/${params.id}`);

  return (
    <FormLayout title='Modificar Estado' isLoading={isLoading} isError={isError}>
      <FormEstados
        initialValues={{
          iD_ESTADO: data?.dato?.iD_ESTADO,
          nombrE_ESTADO: data?.dato?.nombrE_ESTADO,
          clavE_ESTADO: data?.dato?.clavE_ESTADO,
          comentario: data?.dato?.comentario,
          estatus: data?.dato?.estatus
        }}
        url='estados'
        isEditForm={true}
      />
    </FormLayout>
  );
}
