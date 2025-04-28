import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import {
  getAlmacen,
  getArticulos,
  getTipoMoneda,
  getTipoTransaccion,
  getUnidadMedida
} from '@/utils/dataToSelectOptions';

export const FormRecepcionDetalle = ({
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
  closeModal?: (value: boolean) => any;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('RecepcionDetalle/relacion');

  // console.log(data);

  const formInputs: FORMINPUT[] = [
    {
      name: 'iD_ITEM',
      label: 'Artículo',
      type: 'select',
      options: getArticulos(data?.relacion?.articulos),
      fullWidth: true
    },
    {
      name: 'cantidad',
      label: 'Cantidad',
      type: 'number',
      placeholder: 'Escribe  la cantidad'
    },
    {
      name: 'iD_UOM',
      label: 'Unidades de medida',
      type: 'select',
      options: getUnidadMedida(data?.relacion?.unidad)
      // fullWidth: true
    },
    {
      name: 'costo',
      label: 'Costo',
      type: 'number',
      placeholder: 'Escribe  el costo del artículo'
    },

    {
      name: 'iD_TIPO_MONEDA',
      label: 'Tipo moneda',
      type: 'select',
      options: getTipoMoneda(data?.relacion?.tipoMoneda)
      // fullWidth: true
    }
  ];

  if (!isEditForm) {
    formInputs.push({
      name: 'fechA_RECEPCION',
      label: 'Fecha recepción',
      type: 'date',
      placeholder: 'Selecciona la fecha...',
      fullWidth: true
    });
  }

  const validationSchema = Yup.object().shape({
    // referencia: Yup.string()
    //   .min(3, 'El estatus tiene que tener 3 caracteres')
    //   .required('Este campo es requerido')
    // fechA_RECEPCION: Yup.date().required('Este campo es requerido'),
    iD_ITEM: Yup.string().required('Este campo es requerido'),
    cantidad: Yup.number().required('Este campo es requerido'),
    iD_UOM: Yup.number().required('Este campo es requerido')
    // iD_PROVEEDOR: Yup.date().required('Este campo es requerido'),
    // iD_TIPO_TRANSACCION: Yup.date().required('Este campo es requerido')
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
          isBackOnCancel={false}
          closeModal={closeModal}
          onSubmit={(values) => {
            let { descripcion, item } = data?.relacion?.articulos?.find(
              (item: any) => item.iD_ITEM == values.iD_ITEM
            );

            values = {
              ...values,
              descripcion,
              item
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
