import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import {
  getArticulos,
  getCategoriaActivos,
  getCategoriaArticulos,
  getUnidadMedida
} from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormConversionesArticulos = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('conversiones/relacion');

  const formInputs: FORMINPUT[] = [
    {
      name: 'iD_ITEM',
      label: 'Artículo',
      type: 'select',
      options: getArticulos(data?.relacion?.articulos),
      fullWidth: true
    },
    {
      name: 'iD_UOM_ORIGEN',
      label: 'Unidad origen',
      type: 'select',
      options: getUnidadMedida(data?.relacion?.unidadMedidas),
      fullWidth: true
    },
    {
      name: 'iD_UOM_DESTINO',
      label: 'Unidad destino',
      type: 'select',
      options: getUnidadMedida(data?.relacion?.unidadMedidas),
      fullWidth: true
    },
    {
      name: 'cantidaD_ORIGEN',
      label: 'Cantidad origen',
      type: 'number',
      placeholder: 'Escribe la cantidad origen'
    },
    {
      name: 'cantidaD_DESTINO',
      label: 'Cantidad destino',
      type: 'number',
      placeholder: 'Escribe la cantidad destino'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Escribe una descrición...',
      fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    iD_ITEM: Yup.number().required('Este campo es requerido'),
    iD_UOM_ORIGEN: Yup.number().required('Este campo es requerido'),
    iD_UOM_DESTINO: Yup.number().required('Este campo es requerido'),
    cantidaD_ORIGEN: Yup.number().required('Este campo es requerido'),
    cantidaD_DESTINO: Yup.number().required('Este campo es requerido')
  });

  return (
    <Form
      initialValues={initialValues}
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
    />
  );
};
