'use client';
import { FormReferenciasPaciente } from '@/components/forms/referenciasPaciente';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function UbicacionSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `referenciaspaciete/${params.id}`
  );
  // console.log(data);
  return (
    <FormLayout title='Modificar Referencia Paciente' isLoading={isLoading} isError={isError}>
      <FormReferenciasPaciente
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          activo: data?.data?.activo
        }}
        url='referenciaspaciete'
        isEditForm={true}
      />
    </FormLayout>
  );
}
