import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getAlmacen, getTipoTransaccion } from '@/utils/dataToSelectOptions';

export const FormRecepcion = ({
  initialValues,
  url,
  isEditForm,
  permisoToEdit = true,
  closeModal
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  permisoToEdit?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('RecepcionCabecera/relacion');

  const formInputs: FORMINPUT[] = [
    // {
    //   name: 'referencia',
    //   label: 'Referencia',
    //   type: 'text',
    //   placeholder: 'Escribe una referencia de recepción...',
    //   fullWidth: true
    // },
    {
      name: 'descripcion',
      label: 'Descripción de recepción',
      type: 'text',
      placeholder: 'Escribe la descripción de la recepción...',
      fullWidth: true
    },
    {
      name: 'iD_ALMACEN',
      label: 'Almacen',
      type: 'select',
      options: getAlmacen(data?.relacion?.almacen),
      fullWidth: true
    },
    {
      name: 'iD_PROVEEDOR',
      label: 'Proveedor',
      type: 'select'
      // options: getProveedores(data?.relacion?.estados),
      // fullWidth: true
    },
    {
      name: 'iD_TIPO_TRANSACCION',
      label: 'Tipo transacción',
      type: 'select',
      options: getTipoTransaccion(data?.relacion?.tipoTransaccion)
      // fullWidth: true
    },
    {
      name: 'fechA_RECEPCION',
      label: 'Fecha recepción',
      type: 'date',
      placeholder: 'Selecciona la fecha...',
      fullWidth: true
    }
    // {
    //   name: 'estatus',
    //   label: 'Activo',
    //   type: 'checkbox'
    // }
  ];

  const validationSchema = Yup.object().shape({
    descripcion: Yup.string()
      .min(3, 'La descripción tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    fechA_RECEPCION: Yup.date().required('Este campo es requerido'),
    iD_ALMACEN: Yup.number().required('Este campo es requerido'),
    // iD_PROVEEDOR: Yup.date().required('Este campo es requerido'),
    iD_TIPO_TRANSACCION: Yup.date().required('Este campo es requerido')
  });

  return (
    <>
      {permisoToEdit ? (
        <Form
          initialValues={initialValues}
          formInputs={formInputs}
          validationSchema={validationSchema}
          cancelButton={true}
          submitButton={true}
          isBack={!isEditForm}
          isBackOnCancel={!isEditForm}
          closeModal={closeModal}
          onSubmit={(values) => {
            values = {
              ...values,
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
      ) : (
        <Form initialValues={initialValues} formInputs={formInputs} cancelButton={true} isBack />
      )}
    </>
  );
};
