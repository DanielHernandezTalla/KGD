import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import {
  getCentroCosto,
  getCiudades,
  getEncargados,
  getEstados
} from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormAlmacenes = ({
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
  const { data }: IDataResponse<any> = useRequest('almacen/relacion');
  const [{ estado }, setDataFilter] = useState({
    estado: {
      iD_ESTADO: initialValues?.iD_ESTADO || null
    }
  });

  // console.log(data);

  const formInputs: FORMINPUT[] = [
    {
      name: 'almacen',
      label: 'Almacen',
      type: 'text',
      placeholder: 'Escribe el almacen...'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Escribe la descripción del almacen...'
    },
    {
      name: 'iD_CENTRO_COSTO',
      label: 'Centro de costo',
      type: 'select',
      options: getCentroCosto(data?.relacion?.centroCosto),
      fullWidth: true
    },
    {
      name: 'iD_ESTADO',
      label: 'Estado',
      type: 'select',
      options: getEstados(data?.relacion?.estados)
    },
    {
      name: 'iD_CIUDAD',
      label: 'Ciudades',
      type: 'select',
      options: getCiudades(data?.relacion?.ciudades, estado)
    },
    {
      name: 'iD_ENCARGADO',
      label: 'Encargado',
      type: 'select',
      options: getEncargados(data?.relacion?.encargados),
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    almacen: Yup.string()
      .min(3, 'El almacen tiene que tener al menos 3 caracteres')
      .required('Este campo es requerido'),
    iD_CENTRO_COSTO: Yup.number().required('Este campo es requerido'),
    iD_CIUDAD: Yup.number().required('Este campo es requerido'),
    iD_ESTADO: Yup.number().required('Este campo es requerido'),
    iD_ENCARGADO: Yup.number().required('Este campo es requerido')
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'iD_ESTADO') {
      setDataFilter((rest) => ({
        estado: {
          ...data?.relacion?.ciudades.find(
            (value: any) => value.iD_ESTADO == Number(props?.target.value)
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
          toast
        });
      }}
      isEditForm={isEditForm}
      permisoToEdit={permisoToEdit}
    />
  );
};
