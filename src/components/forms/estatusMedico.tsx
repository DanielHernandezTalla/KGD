import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';

export const FormEstatusMedico = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre del estatus',
      type: 'text',
      placeholder: 'Escribe el nombre del estatus...',
      fullWidth: true
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El estatus tiene que tener 3 caracteres')
      .required('Este campo es requerido')
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
