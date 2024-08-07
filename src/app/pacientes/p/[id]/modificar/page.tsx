'use client';
import { Toast } from '@/components/atoms';
import { FormPacientes } from '@/components/forms/pacientes';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function PacienteSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`pacientes/${params.id}`);

  return (
    <FormLayout title='Modificar Paciente' isLoading={isLoading} isError={isError}>
      <FormPacientes
        initialValues={{
          id: data?.data?.id,
          nombre: data?.data?.nombre,
          apellido_paterno: data?.data?.apellido_paterno,
          apellido_materno: data?.data?.apellido_materno,
          fecha_nacimiento: data?.data?.fecha_nacimiento,
          sexo: data?.data?.sexo,
          celular: data?.data?.celular,
          correo: data?.data?.correo,
          activo: data?.data?.activo
        }}
        url='pacientes'
        isEditForm={true}
      />
      {!data?.ok && <Toast message={data?.errors?.id?.msg} ok={false} />}
    </FormLayout>
  );
}
