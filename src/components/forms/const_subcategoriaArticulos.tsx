import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormSubcategoriaArticulos = ({
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
      name: 'subcategoriA_ARTICULOS',
      label: 'Subcategoría',
      type: 'text',
      placeholder: 'Escribe la subcategoría del artículo...',
      fullWidth: true
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Escribe la descripción...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    subcategoriA_ARTICULOS: Yup.string()
      .min(3, 'El tipo de pago tiene que tener 3 caracteres')
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
          ...values
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
