import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormCategoriaPermisos = ({
  initialValues,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const formInputs: FORMINPUT[] = [
    {
      name: 'tipopermiso',
      label: 'Tipo de permiso',
      type: 'text',
      placeholder: 'Escribe el tipo de permiso...',
      fullWidth: true
    },
    // {
    //   name: 'title',
    //   label: 'Nombre boton',
    //   type: 'text',
    //   placeholder: 'Escribe el nombre del botón...',
    //   fullWidth: true
    // },
    {
      name: 'routE_NAME',
      label: 'Nombre ruta',
      type: 'text',
      placeholder: 'Escribe el nombre de la ruta...',
      fullWidth: true
    }
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
    tipopermiso: Yup.string()
      .min(3, 'El tipo de permiso debe tener minimo 3 caracteres')
      .required('Este campo es requerido')
  });

  return (
    <>
      <Form
        initialValues={initialValues}
        formInputs={formInputs}
        validationSchema={validationSchema}
        cancelButton={true}
        submitButton={true}
        closeModal={closeModal}
        isBackOnCancel={false}
        onSubmit={(values) =>
          handlePost({
            url: isEditForm ? 'tipopermisos' : 'tipopermisos',
            values,
            method: isEditForm ? 'PUT' : 'POST',
            toast,
            closeModal
          })
        }
        isEditForm={isEditForm}
      />
    </>
  );
};
