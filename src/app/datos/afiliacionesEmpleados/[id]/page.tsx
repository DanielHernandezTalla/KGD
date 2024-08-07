'use client';
import { FormAfiliacionesEmp } from '@/components/forms/afiliacionesDeEmpleado';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function AfiliacionesDeEmpleadosSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `afiliacionesempleados/${params.id}`
  );
  return (
    <FormLayout title='Modificar Afiliaciones de Empleados' isLoading={isLoading} isError={isError}>
      <FormAfiliacionesEmp
        initialValues={{
          id: data?.data?.id,
          empleado_id: data?.data?.empleado_id,
          sucursal_id: data?.data?.sucursal_id,
          activo: data?.data?.activo
        }}
        url='afiliacionesempleados'
        isEditForm={true}
      />
    </FormLayout>
  );
}
