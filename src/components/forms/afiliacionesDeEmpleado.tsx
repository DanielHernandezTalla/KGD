import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';

export const FormAfiliacionesEmp = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { data }: IDataResponse<any> = useRequest('form/empleadosAndSucursales');

  const formInputs: FORMINPUT[] = [
    {
      name: 'empleado_id',
      label: 'Empleado',
      type: 'select',
      options: getData(data?.data?.empleados),
      fullWidth: true
    },
    {
      name: 'sucursal_id',
      label: 'Sucursal',
      type: 'select',
      options: getData(data?.data?.sucursales),
      fullWidth: true
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    empleado_id: Yup.number().required('Este campo es requerido'),
    sucursal_id: Yup.number().required('Este campo es requerido')
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
