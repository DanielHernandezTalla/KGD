import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getAlmacen2, getEmpleado, getSucursal } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormEmpleadosPorAlmacen = ({
  initialValues,
  url,
  isEditForm,
  closeModal,
  permisoToEdit = true
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  permisoToEdit?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('empleadosalmacen/relacion');

  const [{ sucursal }, setDataFilter] = useState({
    sucursal: {
      iD_SUCURSAL: initialValues?.iD_SUCURSAL || null
    }
  });

  const formInputs: FORMINPUT[] = [
    {
      name: 'iD_EMPLEADO',
      label: 'Empleado',
      type: 'select',
      options: getEmpleado(data?.relacion?.empleados),
      fullWidth: true
    },
    {
      name: 'iD_SUCURSAL',
      label: 'Sucursal',
      type: 'select',
      options: getSucursal(data?.relacion?.sucursal),
      fullWidth: true
    },
    {
      name: 'iD_ALMACEN',
      label: 'Almacen',
      type: 'select',
      options: getAlmacen2(data?.relacion?.almacen, sucursal),
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    iD_SUCURSAL: Yup.string().required('Este campo es requerido'),
    iD_ALMACEN: Yup.string().required('Este campo es requerido'),
    iD_EMPLEADO: Yup.string().required('Este campo es requerido')
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'iD_SUCURSAL') {
      setDataFilter((rest) => ({
        sucursal: {
          ...data?.relacion?.almacen.find(
            (value: any) => value.iD_SUCURSAL == Number(props?.target.value)
          )
        }
      }));
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onChange={onChange}
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
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
      permisoToEdit={permisoToEdit}
    />
  );
};
