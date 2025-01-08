import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormEstatusSalida = ({
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
      name: 'salidA_ESTATUS',
      label: 'Nombre del estatus',
      type: 'text',
      placeholder: 'Escribe el nombre del estatus...',
      fullWidth: true
    },
    {
      name: 'descripcion',
      label: 'Descripción del estatus',
      type: 'text',
      placeholder: 'Escribe la descripción del estatus...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    salidA_ESTATUS: Yup.string()
      .min(3, 'El estatus tiene que tener 3 caracteres')
      .required('Este campo es requerido')
  });

  return (
    <>
      {permisoToEdit ? (
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
      ) : (
        <Form initialValues={initialValues} formInputs={formInputs} cancelButton={true} isBack />
      )}
    </>
  );
};
