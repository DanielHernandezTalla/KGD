import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getTipoPermisos } from '@/utils/dataToSelectOptions';

export const FormPermisos = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('permisos/relacion');
  // console.log(data);

  const formInputs: FORMINPUT[] = [
    {
      name: 'name',
      label: 'Nombre del permiso',
      type: 'text',
      placeholder: 'Escribe el nombre del permiso...',
      fullWidth: true
    },
    {
      name: 'typE_PERMISSIONS_ID',
      label: 'Tipo de permiso',
      type: 'select',
      options: getTipoPermisos(data?.relacion?.tipoPermisos),
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'El nombre del permiso debe tener minimo 3 caracteres')
      .required('Este campo es requerido'),
    typE_PERMISSIONS_ID: Yup.number().required('Este campo es requerido')
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
          guarD_NAME: values.name,
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
