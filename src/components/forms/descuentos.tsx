import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';

export const FormDescuentos = ({
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
      label: 'Nombre del descuento',
      type: 'text',
      placeholder: 'Escribe el nombre del descuento...',
      fullWidth: true
    },
    {
      name: 'cantidad',
      label: 'Cantidad del descuento',
      type: 'number',
      placeholder: 'Escribe la cantidad del descuento...',
      fullWidth: true
    },
    {
      name: 'es_porcentaje',
      label: 'Es porcentaje',
      type: 'checkbox'
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    cantidad: Yup.number().min(0, 'Minimo de 0').required('Este campo es requerido')
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
