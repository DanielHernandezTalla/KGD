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
  // const { data }: IDataResponse<any> = useRequest('RecepcionCabecera/relacion');
  const { data }: IDataResponse<any> = useRequest('EmpleadosAlmacen/Asignados'); // Obtenemos los almacenes desde los almacenes que tengo asignados
  const almacenes = data?.listado;

  const formInputs: FORMINPUT[] = [
    {
      name: 'referencia',
      label: 'Factura',
      type: 'text',
      placeholder: 'Escribe una factura de recepción...'
    },
    {
      name: 'chofer',
      label: 'Chofer',
      type: 'text',
      placeholder: 'Escribe el chofer de recepción...'
    },
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
      options: getAlmacen(almacenes),
      fullWidth: true
    },
    {
      name: 'iD_PROVEEDOR',
      label: 'Proveedor',
      type: 'select',
      // options: getProveedores(data?.relacion?.estados),
      fullWidth: true
    },
    // {
    //   name: 'iD_TIPO_TRANSACCION',
    //   label: 'Tipo transacción',
    //   type: 'select',
    //   options: getTipoTransaccion(data?.relacion?.tipoTransaccion)
    //   // fullWidth: true
    // },
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

// chofer: "Daniel Hernandez"
// descripcion: "RECEPCION DIARIA"
// fechA_RECEPCION: "2025-04-28"
// iD_ALMACEN: 4
// iD_PROVEEDOR: 0
// iD_RECEPCION: "32"
// iD_RECEPCION_ESTATUS: 1
// iD_TIPO_TRANSACCION: 1
// referencia: "FD126"


// chofer: "Daniel Hernandezfs"
// descripcion: "RECEPCION DIARIAfs"
// fechA_RECEPCION: "2025-04-27"
// iD_ALMACEN: 4
// iD_PROVEEDOR: 0
// iD_RECEPCION: "32"
// iD_RECEPCION_ESTATUS: 1
// iD_TIPO_TRANSACCION: 1
// referencia: "FD126fs"