'use client';
import { FormImplementacionesDeEST } from '@/components/forms/implementacionesDeEstudio';
import { FormMedicos } from '@/components/forms/medicos';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export default function MedicoSingle({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `medicosremitentes/${params.id}`
  );
  let mydata = data?.data;

  return (
    <FormLayout title='Modificar Médico' isLoading={isLoading} isError={isError}>
      <FormMedicos
        initialValues={{
          id: mydata?.infoData?.id,
          nombre: mydata?.infoData?.nombre,
          apellido_paterno: mydata?.infoData?.apellido_paterno,
          apellido_materno: mydata?.infoData?.apellido_materno,
          estatus_medico_id: mydata?.infoData?.estatus_medico_id,
          ubicaciones_de_medico_id: mydata?.infoData?.ubicaciones_de_medico_id,
          celular: mydata?.celular ? mydata?.infoData?.celular : '',
          activo: mydata?.infoData?.activo,
          especialidades: mydata?.especialidades.map((item: any) => item.id)
          // especialidades: mydata?.especialidades.map((item: any) => ({
          //   value: item.id,
          //   label: item.nombre
          // }))
        }}
        url='medicosremitentes'
        isEditForm={true}
      />
    </FormLayout>
  );
}
