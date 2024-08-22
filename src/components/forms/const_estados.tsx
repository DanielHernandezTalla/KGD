import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormEstados = ({
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
      name: 'nombrE_ESTADO',
      label: 'Nombre del estado',
      type: 'text',
      placeholder: 'Escribe el nombre del estado...',
      fullWidth: true
    },
    {
      name: 'clavE_ESTADO',
      label: 'Nombre la clave del estado',
      type: 'text',
      placeholder: 'Escribe la clave del estado...',
      fullWidth: true
    },
    {
      name: 'comentario',
      label: 'Comentario',
      type: 'textarea',
      placeholder: 'Escribe un comentario...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    nombrE_ESTADO: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
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
