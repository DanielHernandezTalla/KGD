import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';
import { useState } from 'react';

export const FormMedicos = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('form/estatusAndUbicacionesMedicos');
  const [especialidades, setEspecialidades] = useState([]);

  // console.log(getData(data?.data?.especialidades));
  // console.log(initialValues);

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre del paciente',
      type: 'text',
      placeholder: 'Escribe el nombre del paciente...',
      fullWidth: true
    },
    {
      name: 'apellido_paterno',
      label: 'Apellido Paterno',
      type: 'text',
      placeholder: 'Escribe el apellido paterno...'
    },
    {
      name: 'apellido_materno',
      label: 'Apellido Materno',
      type: 'text',
      placeholder: 'Escribe el apellido materno...'
    },
    {
      name: 'estatus_medico_id',
      label: 'Estatus Médico',
      type: 'select',
      options: getData(data?.data?.estatus)
      // fullWidth: true
    },
    {
      name: 'ubicaciones_de_medico_id',
      label: 'Ubicación',
      type: 'select',
      options: getData(data?.data?.ubicacion)
      // fullWidth: true
    },
    {
      name: 'celular',
      label: 'Celular',
      type: 'text',
      placeholder: 'Escribe el número de celular...',
      fullWidth: true
    },
    {
      name: 'especialidades',
      label: 'Especialidades',
      type: 'selectmultiple',
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
    nombre: Yup.string()
      .min(3, 'El nombre tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    apellido_paterno: Yup.string()
      .min(3, 'El apellido tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    estatus_medico_id: Yup.number().required('Este campo es requerido'),
    ubicaciones_de_medico_id: Yup.number().required('Este campo es requerido'),
    productividad: Yup.number().min(1, 'No puede ser menor a 1')
  });

  return (
    <Form
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      isBack
      onSubmit={(values) => {
        // console.log(values);

        handlePost({
          url: isEditForm ? url + '/edit' : url + '/add',
          values,
          method: isEditForm ? 'PUT' : 'POST',
          toast: toast
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
