import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';

export const FormImplementacionesDeEST = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { data }: IDataResponse<any> = useRequest('form/estudiosAndSucursales');

  const formInputs: FORMINPUT[] = [
    {
      name: 'estudio_id',
      label: 'Estudio',
      type: 'select',
      options: getData(data?.data?.estudios),
      fullWidth: true
    },
    {
      name: 'sucursales_id',
      label: 'Sucursal',
      type: 'select',
      options: getData(data?.data?.sucursales),
      fullWidth: true
    },
    {
      name: 'productividad',
      label: 'Productividad',
      type: 'number',
      placeholder: 'Ingresa una cantidad...',
      fullWidth: true
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    estudio_id: Yup.number().required('Este campo es requerido'),
    sucursales_id: Yup.number().required('Este campo es requerido'),
    productividad: Yup.number().min(1, 'No puede ser menor a 1')
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
