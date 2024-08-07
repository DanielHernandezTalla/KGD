import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormNota = ({
  initialValues,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const formInputs: FORMINPUT[] = [
    {
      name: 'asunto',
      label: 'Asunto',
      type: 'text',
      placeholder: 'Escribe el asunto...',
      fullWidth: true
    },
    {
      name: 'descripcion',
      label: 'Descripcion',
      type: 'textarea',
      placeholder: 'Escriba la descripcion...',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    asunto: Yup.string()
      .min(3, 'El asunto tiene que tener minimo 3 caracteres')
      .max(50, 'El asunto tiene que tener maximo 50 caracteres')
      .required('Este campo es requerido'),
    descripcion: Yup.string()
      .min(3, 'La descripcion del grupo tiene que tener minimo 3 caracteres')
      .max(200, 'La descripcion tiene que tener maximo 200 caracteres')
      .required('Este campo es requerido')
  });

  return (
    <>
      <Form
        initialValues={{
          id: initialValues.nota.id,
          usuarios_id: initialValues.usuarios_id,
          cita_id: initialValues.cita_id,
          asunto: initialValues.nota.asunto || '',
          descripcion: initialValues.nota.descripcion || ''
        }}
        formInputs={formInputs}
        validationSchema={validationSchema}
        cancelButton={true}
        submitButton={true}
        onSubmit={(values) =>
          handlePost({
            url: isEditForm ? 'notas/edit' : 'notas/add',
            values,
            method: isEditForm ? 'PUT' : 'POST',
            toast,
            closeModal
          })
        }
        isEditForm={isEditForm}
      />
    </>
  );
};
