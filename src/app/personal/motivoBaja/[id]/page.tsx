'use client';
import { FormMotivoBaja } from '@/components/forms/const_motivoBaja';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function MotivoBajaSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`motivobaja/${params.id}`);

  return (
    <FormLayout title='Modificar motivo de baja' isLoading={isLoading} isError={isError}>
      <FormMotivoBaja
        initialValues={{
          iD_MOTIVO_BAJA: data?.dato?.iD_MOTIVO_BAJA,
          motivO_BAJA: data?.dato?.motivO_BAJA,
          descripcion: data?.dato?.descripcion,
          estatus: data?.dato?.estatus
        }}
        url='motivobaja'
        isEditForm={true}
      />
    </FormLayout>
  );
}
