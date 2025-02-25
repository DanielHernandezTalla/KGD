import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getTipoPermisoDetalle, getTipoPermisos } from '@/utils/dataToSelectOptions';

export const FormEventos = ({
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
  const { data }: IDataResponse<any> = useRequest('permisosdetail/relacion');

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre del evento',
      type: 'text',
      placeholder: 'Escribe el nombre del evento...',
      fullWidth: true
    },
    {
      name: 'routE_NAME',
      label: 'Ruta',
      type: 'text',
      placeholder: 'Escribe la ruta del evento...',
      fullWidth: true
    },
    {
      name: 'iD_TIPOPERMISODETAIL',
      label: 'Tipo de evento',
      type: 'select',
      options: getTipoPermisoDetalle(data?.relacion?.tipoPermisosDet), //Cambiar esto por tipo de evento
      fullWidth: true
    }
    // {
    //   name: 'iD_',
    //   label: 'Permiso',
    //   type: 'select',
    //   options: getTipoPermisos(data?.relacion?.tipoPermisos),
    //   fullWidth: true
    // }
  ];

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre del evento debe tener minimo 3 caracteres')
      .required('Este campo es requerido')
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
          creadO_POR: 3
        };

        console.log(values);

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

// creadO_POR: 3
// iD_PERMISO: 8
// iD_ROL: "1"
// iD_TIPOPERMISO: 1
// iD_TIPOPERMISODETAIL: 4
// nombre: "Nuevo"
