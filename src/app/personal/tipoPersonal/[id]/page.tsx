'use client';
import { FormTipoPersonal } from '@/components/forms/const_tipoPersonal';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function SucursalesSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`tipopersonal/${params.id}`);

  return (
    <FormLayout title='Modificar tipo de personal' isLoading={isLoading} isError={isError}>
      <FormTipoPersonal
        initialValues={{
          iD_TIPO_PERSONAL: data?.dato?.iD_TIPO_PERSONAL,
          tipO_PERSONAL: data?.dato?.tipO_PERSONAL,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='tipopersonal'
        isEditForm={true}
      />
    </FormLayout>
  );
}
