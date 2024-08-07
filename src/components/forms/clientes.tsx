import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';

export const FormClientes = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { data }: IDataResponse<any> = useRequest('form/tipoCliente');

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre del cliente',
      type: 'text',
      placeholder: 'Escribe el nombre del cliente...',
      fullWidth: true
    },
    {
      name: 'tipo_de_cliente_id',
      label: 'Tipo de Cliente',
      type: 'select',
      placeholder: 'Seleccione Tipo de Cliente...',
      options: getData(data?.data?.tipoCliente),
      fullWidth: true
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
    tipo_de_cliente_id: Yup.number().required('Este campo es requerido')
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
