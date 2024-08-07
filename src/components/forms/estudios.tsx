import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';

export const FormEstudios = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { data }: IDataResponse<any> = useRequest('form/tipoEstudios');

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre del estudio',
      type: 'text',
      placeholder: 'Escribe el nombre del estudio...',
      fullWidth: true
    },
    {
      name: 'tipo_de_estudio_id',
      label: 'Tipo de Estudio',
      type: 'select',
      placeholder: 'Seleccione Tipo de Estudio...',
      options: getData(data?.data?.tipoEstudios),
      fullWidth: true
    },
    {
      name: 'productividad',
      label: 'Productividad del estudio',
      type: 'number',
      placeholder: 'Escribe la productividad...',
      fullWidth: true
    },
    {
      name: 'requiere_medico',
      label: 'Requiere Médico',
      type: 'checkbox'
    },
    {
      name: 'requiere_tecnico',
      label: 'Requiere Técnico',
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
    tipo_de_estudio_id: Yup.number().required('Este campo es requerido'),
    productividad: Yup.number().min(0, 'Minimo de 0').required('Este campo es requerido')
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
