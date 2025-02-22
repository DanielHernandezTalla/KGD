import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormRoles = ({
  initialValues,
  url,
  isEditForm,
  permisoToEdit = true
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  permisoToEdit?: boolean;
}) => {
  const { toast } = useToast();

  const formInputs: FORMINPUT[] = [
    {
      name: 'role',
      label: 'Nombre de rol',
      type: 'text',
      placeholder: 'Escribe el nombre del rol...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    role: Yup.string()
      .min(3, 'El nombre del rol debe tener minimo 3 caracteres')
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
      onSubmit={(values) => {
        values = {
          ...values,
          rolE_NAME: values.role,
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
      permisoToEdit={permisoToEdit}
    />
  );
};
