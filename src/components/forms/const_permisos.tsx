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
  isEditForm,
  closeModal
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('permisos/relacion');

  const formInputs: FORMINPUT[] = [
    {
      name: 'permiso',
      label: 'Nombre del permiso',
      type: 'text',
      placeholder: 'Escribe el nombre del permiso...',
      fullWidth: true
    },
    {
      name: 'routE_NAME',
      label: 'Nombre ruta',
      type: 'text',
      placeholder: 'Escribe el nombre de la ruta...',
      fullWidth: true
    },
    {
      name: 'TIPOPERMISO_ID',
      label: 'Tipo de permiso',
      type: 'select',
      options: getTipoPermisos(data?.relacion?.tipoPermisos),
      fullWidth: true
    }
    // {
    //   name: 'title',
    //   label: 'Nombre boton',
    //   type: 'text',
    //   placeholder: 'Escribe el nombre del botón...',
    //   fullWidth: true
    // },

    // {
    //   name: 'icon',
    //   label: 'Icono fontawesome',
    //   type: 'text',
    //   placeholder: 'Escribe icono de fontawesome...',
    //   fullWidth: true
    // },
    // {
    //   name: 'iS_LINK',
    //   label: 'Es link',
    //   type: 'checkbox'
    // },
    // {
    //   name: 'estatus',
    //   label: 'Activo',
    //   type: 'checkbox'
    // }
  ];

  const validationSchema = Yup.object().shape({
    permiso: Yup.string()
      .min(3, 'El nombre del permiso debe tener minimo 3 caracteres')
      .required('Este campo es requerido'),
    TIPOPERMISO_ID: Yup.number().required('Este campo es requerido')
  });

  return (
    <Form
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      closeModal={closeModal}
      isBackOnCancel={false}
      onSubmit={(values) => {
        values = {
          ...values,
          permiso_name: values.permiso,
          creadO_POR: 3
        };

        handlePost({
          url,
          values,
          method: isEditForm ? 'PUT' : 'POST',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
