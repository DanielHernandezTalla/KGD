import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { getPermisos, getRoles } from '@/utils/dataToSelectOptions';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

export const FormRolesYPermisos = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('rolespermiso/relacion');

  const formInputs: FORMINPUT[] = [
    {
      name: 'iD_ROLES',
      label: 'Role',
      type: 'select',
      options: getRoles(data?.relacion?.roles),
      fullWidth: true
    },
    {
      name: 'iD_PERMISO',
      label: 'Permiso',
      type: 'select',
      options: getPermisos(data?.relacion?.permisos),
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    iD_ROLES: Yup.number().required('Este campo es requerido'),
    iD_PERMISO: Yup.number().required('Este campo es requerido')
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
          method: isEditForm ? 'DELETE' : 'POST',
          toast
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
