import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getEncargados, getRoles } from '@/utils/dataToSelectOptions';

export const FormUsuarios = ({
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
  const { data }: IDataResponse<any> = useRequest('usuarios/relacion');


  const formInputs: FORMINPUT[] = [
    {
      name: 'name',
      label: 'Nombre de usuario',
      type: 'text',
      placeholder: 'Escribe el nombre de usuario...',
      fullWidth: true
    },
    {
      name: 'email',
      label: 'Correo',
      type: 'email',
      placeholder: 'Escribe el correo del usuario...',
      fullWidth: true
    },
    {
      name: 'iD_EMPLEADO',
      label: 'Empleado',
      type: 'select',
      options: getEncargados(data?.relacion?.empleados),
      fullWidth: true
    },
    {
      name: 'id_rol',
      label: 'Rol',
      type: 'select',
      options: getRoles(data?.relacion?.roles),
      fullWidth: true
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '**************',
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
      .min(3, 'El nombre de usuario debe tener minimo 3 caracteres')
      .required('Este campo es requerido'),
    id_rol: Yup.number().required('Este campo es requerido'),
    email: Yup.string().required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
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
      permisoToEdit={permisoToEdit}
    />
  );
};
