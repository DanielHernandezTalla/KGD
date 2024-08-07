'use client';
import { FormEmpleados } from '@/components/forms/empleados';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function EmpleadoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`empleado/${params.id}`);

  return (
    <FormLayout title='Modificar Empleado' isLoading={isLoading} isError={isError}>
      <FormEmpleados
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          apellido_paterno: data?.data?.apellido_paterno,
          apellido_materno: data?.data?.apellido_materno,
          celular: data?.data?.celular,
          correo: data?.data?.correo,
          activo: data?.data?.activo
        }}
        url='empleados'
        isEditForm={true}
      />
    </FormLayout>
  );
}
