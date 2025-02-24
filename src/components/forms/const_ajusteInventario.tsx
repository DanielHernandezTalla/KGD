import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useSession } from 'next-auth/react';
import { ISession } from '@/interface/user';

export const FormAjusteInventario = ({
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
  const { data: session } = useSession() as { data: ISession };

  const formInputs: FORMINPUT[] = [
    {
      name: 'item',
      label: 'Código',
      type: 'text',
      placeholder: 'Escribe el código...',
      disabled: true
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Escribe la descripción...',
      disabled: true
    },
    {
      name: 'cantidad',
      label: 'Cantidad',
      type: 'number',
      placeholder: 'Escribe la cantidad...'
    },
    {
      name: 'unidaD_MEDIDA',
      label: 'Unidad de medida',
      type: 'text',
      placeholder: 'Escribe la unidad de medida...',
      disabled: true
    }
  ];

  const validationSchema = Yup.object().shape({
    cantidad: Yup.number()
      .notOneOf([0], 'La cantidad debe ser distinta de 0')
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
        values = [
          {
            ...values,
            creadO_POR: session?.user?.id
          }
        ];

        handlePost({
          url,
          values,
          method: 'POST',
          toast,
          isCifrado: false
        });
      }}
      isEditForm={isEditForm}
      permisoToEdit={permisoToEdit}
    />
  );
};
