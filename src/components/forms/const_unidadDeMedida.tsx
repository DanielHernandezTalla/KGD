import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormUnidadDeMedida = ({
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
      name: 'unidaD_MEDIDA',
      label: 'Nombre unidad de medida',
      type: 'text',
      placeholder: 'Escribe el nombre de unidad de medida...',
      fullWidth: true
    },
    {
      name: 'nombrE_CORTO',
      label: 'Símbolo',
      type: 'text',
      placeholder: 'Escribe el símbolo o abreviación de la unidad de medida...',
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
    unidaD_MEDIDA: Yup.string()
      .min(3, 'La unidad de medida tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    nombrE_CORTO: Yup.string().required('Este campo es requerido')
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
