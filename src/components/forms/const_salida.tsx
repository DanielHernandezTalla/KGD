import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getAlmacen, getTipoTransaccion } from '@/utils/dataToSelectOptions';

export const FormSalida = ({
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
  const { data: dataAsignados }: IDataResponse<any> = useRequest('EmpleadosAlmacen/Asignados'); // Obtenemos los almacenes desde los almacenes que tengo asignados
  const almacenes = dataAsignados?.listado;
  // console.log(data);

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
      label: 'Descripción de salida',
      type: 'text',
      placeholder: 'Escribe la descripción de la salida...',
      fullWidth: true
    },
    {
      name: 'iD_ALMACEN',
      label: 'Almacen',
      type: 'select',
      options: getAlmacen(almacenes)
      // fullWidth: true
    },
    // {
    //   name: 'iD_PROVEEDOR',
    //   label: 'Proveedor',
    //   type: 'select'
    //   // options: getProveedores(data?.relacion?.estados),
    //   // fullWidth: true
    // },
    {
      name: 'iD_TIPO_TRANSACCION',
      label: 'Tipo transacción',
      type: 'select',
      options: getTipoTransaccion(
        data?.relacion?.tipoTransaccion?.filter(
          (item: any) => item.iD_TIPO_TRANSACCION == 2 || item.iD_TIPO_TRANSACCION == 5
        )
      )
      // fullWidth: true
    },
    {
      name: 'fechA_SALIDA',
      label: 'Fecha salida',
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
    fechA_SALIDA: Yup.date().required('Este campo es requerido'),
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
            // La función o el procedimiento SP_RECEPCION_DETALLE tiene demasiados argumento
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
      ) : (
        <Form initialValues={initialValues} formInputs={formInputs} cancelButton={true} isBack />
      )}
    </>
  );
};
