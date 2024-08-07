import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';

export const FormMedicosEspecialidades = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { data }: IDataResponse<any> = useRequest('form/medicosEspecialidades');

  const formInputs: FORMINPUT[] = [
    {
      name: 'medico_remitente_id',
      label: 'Médico',
      type: 'select',
      options: getData(data?.data?.medicos),
      fullWidth: true
    },
    {
      name: 'especialidad_id',
      label: 'Especialidad',
      type: 'select',
      options: getData(data?.data?.especialidades),
      fullWidth: true
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    medico_remitente_id: Yup.number().required('Este campo es requerido'),
    especialidad_id: Yup.number().required('Este campo es requerido')
  });

  return (
    <Form
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      isBack
      onSubmit={(values) =>
        handlePost({
          url: isEditForm ? url + '/edit' : url + '/add',
          values,
          method: isEditForm ? 'PUT' : 'POST'
        })
      }
      isEditForm={isEditForm}
    />
  );
};
