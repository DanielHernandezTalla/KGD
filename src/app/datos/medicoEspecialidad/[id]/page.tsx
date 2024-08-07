'use client';
import { FormMedicosEspecialidades } from '@/components/forms/medicosEspecialidades';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function AfiliacionesDeEmpleadosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `medicosespecialidades/${params.id}`
  );
  return (
    <FormLayout title='Modificar Médico y Especialidad' isLoading={isLoading} isError={isError}>
      <FormMedicosEspecialidades
        initialValues={{
          id: data?.data?.id,
          medico_remitente_id: data?.data?.medico_remitente_id,
          especialidad_id: data?.data?.especialidad_id,
          activo: data?.data?.activo
        }}
        url='medicosespecialidades'
        isEditForm={true}
      />
    </FormLayout>
  );
}
