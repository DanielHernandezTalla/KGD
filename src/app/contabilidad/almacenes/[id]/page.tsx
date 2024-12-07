'use client';
import { FormAlmacenes } from '@/components/forms/const_almacen';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { useSession } from 'next-auth/react';

export default function AlmacenSingle({ params }: { params: { id: number } }) {
  const { data: user } = useSession();
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`almacen/${params.id}`, {
    idusr: user?.user?.id
  });

  return (
    <FormLayout title='Modificar almacen' isLoading={isLoading} isError={isError}>
      <FormAlmacenes
        initialValues={{
          iD_ALMACEN: data?.dato?.iD_ALMACEN,
          almacen: data?.dato?.almacen,
          descripcion: data?.dato?.descripcion,
          iD_CENTRO_COSTO: data?.dato?.iD_CENTRO_COSTO,
          iD_ESTADO: data?.dato?.iD_ESTADO,
          iD_CIUDAD: data?.dato?.iD_CIUDAD,
          iD_ENCARGADO: data?.dato?.iD_ENCARGADO,
          estatus: data?.dato?.estatus
        }}
        url={`almacen/?idusr=${user?.user?.id}`}
        isEditForm={true}
      />
    </FormLayout>
  );
}
