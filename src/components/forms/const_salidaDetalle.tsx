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
  getTipoTransaccion,
  getUnidadMedida
} from '@/utils/dataToSelectOptions';

export const FormSalidaDetalle = ({
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
  console.log(initialValues);
  console.log(initialValues.iD_TIPO_TRANSACCION);

  const formInputs: FORMINPUT[] = [
    // {
    //   name: 'referencia',
    //   label: 'Referencia',
    //   type: 'text',
    //   placeholder: 'Escribe una referencia...',
    //   fullWidth: true
    // },
    // {
    //   name: 'descripcion',
    //   label: 'Descripción',
    //   type: 'text',
    //   placeholder: 'Escribe una descripción...',
    //   fullWidth: true
    // },
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
      name: 'costo',
      label: 'Costo',
      type: 'number',
      placeholder: 'Escribe  el costo del artículo'
    },

    // {
    //   name: 'iD_ALMACENORIGEN',
    //   label: 'Almacen origen',
    //   type: 'select',
    //   options: getAlmacen(data?.relacion?.almacenOrigen)
    //   // fullWidth: true
    // },
    {
      name: 'iD_UOM',
      label: 'Unidades de medida',
      type: 'select',
      options: getUnidadMedida(data?.relacion?.unidad)
      // fullWidth: true
    },
    {
      name: 'iD_TIPO_TRANSACCION',
      label: 'Tipo transacción',
      type: 'select',
      options: getTipoTransaccion(data?.relacion?.tipoTransaccion),
      disabled: true
      // fullWidth: true
    }
    // {
    //   name: 'iD_ALMACEN',
    //   label: 'Almacen destino',
    //   type: 'select',
    //   options: getAlmacen(data?.relacion?.almacen),
    //   fullWidth: true
    // },
    // {
    //   name: 'fechA_SALIDA',
    //   label: 'Fecha salida',
    //   type: 'date',
    //   placeholder: 'Selecciona la fecha...',
    //   fullWidth: true
    // }
    // {
    //   name: 'estatus',
    //   label: 'Activo',
    //   type: 'checkbox'
    // }
  ];

  if (initialValues.iD_TIPO_TRANSACCION == 2) {
    formInputs.push({
      name: 'iD_ALMACENDESTINO',
      label: 'Almacen destino',
      type: 'select',
      options: getAlmacen(data?.relacion?.almacen),
      fullWidth: true
    });
  }

  formInputs.push({
    name: 'fechA_SALIDA',
    label: 'Fecha salida',
    type: 'date',
    placeholder: 'Selecciona la fecha...',
    fullWidth: true
  });

  const validationSchema = Yup.object().shape({
    // referencia: Yup.string()
    //   .min(3, 'El estatus tiene que tener 3 caracteres')
    //   .required('Este campo es requerido')
    // fechA_RECEPCION: Yup.date().required('Este campo es requerido'),
    // iD_ALMACEN: Yup.date().required('Este campo es requerido'),
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
              iD_ALMACENDESTINO: !values.iD_ALMACENDESTINO ? null : values.iD_ALMACENDESTINO,
              item,
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
