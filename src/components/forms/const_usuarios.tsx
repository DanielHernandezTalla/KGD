import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormUsuarios = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();

  const formInputs: FORMINPUT[] = [
    {
      name: 'name',
      label: 'Nombre de usuario',
      type: 'text',
      placeholder: 'Escribe el nombre de usuario...',
      fullWidth: true
    },
    {
      name: 'email',
      label: 'Correo',
      type: 'email',
      placeholder: 'Escribe el correo del usuario...',
      fullWidth: true
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '**************',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'El nombre de usuario debe tener minimo 3 caracteres')
      .required('Este campo es requerido'),
    email: Yup.string().required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
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
        values = {
          ...values,
          creadO_POR: 3
        };

        handlePost({
          url,
          values,
          method: isEditForm ? 'PUT' : 'POST',
          toast
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
