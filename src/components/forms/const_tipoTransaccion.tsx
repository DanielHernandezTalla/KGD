import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormTipoTransaccion = ({
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
      name: 'tipO_TRANSACCION',
      label: 'Tipo transacción',
      type: 'text',
      placeholder: 'Escribe el tipo de transacción...',
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
    tipO_TRANSACCION: Yup.string()
      .min(3, 'El tipo de transacción tiene que tener 3 caracteres')
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
