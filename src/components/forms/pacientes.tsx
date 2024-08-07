import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { getData } from '@/utils/dataToSelectOptions';

export const FormPacientes = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const data = [
    { id: false, nombre: 'Femenino' },
    { id: true, nombre: 'Masculino' }
  ];

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
      name: 'fecha_nacimiento',
      label: 'Fecha Nacimiento',
      type: 'date',
      fullWidth: true
    },
    {
      name: 'sexo',
      label: 'Sexo',
      type: 'select',
      placeholder: 'Seleccione el Sexo...',
      options: getData(data),
      fullWidth: true
    },
    {
      name: 'celular',
      label: 'Celular',
      type: 'text',
      placeholder: 'Escribe el celular...'
    },
    {
      name: 'correo',
      label: 'Correo',
      type: 'email',
      placeholder: 'Escribe el correo...'
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
    fecha_nacimiento: Yup.date().required('Este campo es requerido'),
    sexo: Yup.boolean().required('Este campo es requerido')
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
        console.log(values);

        handlePost({
          url: isEditForm ? url + '/edit' : url + '/add',
          values,
          method: isEditForm ? 'PUT' : 'POST'
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
