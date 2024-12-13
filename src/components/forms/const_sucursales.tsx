import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData, getEmpresas, getEstados } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormSucursales = ({
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
  const { data }: IDataResponse<any> = useRequest('sucursal/relacion');
  // console.log(data);

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombrE_SUCURSAL',
      label: 'Nombre de la sucursal',
      type: 'text',
      placeholder: 'Escribe el nombre de la sucursal...',
      fullWidth: true
    },
    {
      name: 'iD_EMPRESA',
      label: 'Empresa',
      type: 'select',
      options: getEmpresas(data?.relacion?.empresas),
      fullWidth: true
    },
    {
      name: 'segmentO2',
      label: 'Segmento 02',
      type: 'text',
      placeholder: 'Escribe el segmento 02...',
      fullWidth: true
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
      placeholder: 'Escribe la dirección...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    nombrE_SUCURSAL: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    iD_EMPRESA: Yup.number().required('Este campo es requerido')
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
      permisoToEdit={permisoToEdit}
    />
  );
};
