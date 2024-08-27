import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import {
  getCategoriaActivos,
  getCategoriaArticulos,
  getCiudades,
  getData,
  getEstados
} from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormArticulos = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('articulos/relacion');

  const formInputs: FORMINPUT[] = [
    {
      name: 'item',
      label: 'Código',
      type: 'text',
      placeholder: 'Escribe el código...'
      // fullWidth: true
    },
    {
      name: 'codigO_SAT',
      label: 'Código SAT',
      type: 'text',
      placeholder: 'Escribe el código del SAT...'
    },
    {
      name: 'descripcion',
      label: 'Nombre artículo',
      type: 'text',
      placeholder: 'Escribe el nombre del artículo...',
      fullWidth: true
    },
    {
      name: 'iD_CATEGORIA',
      label: 'Categoría artículo',
      type: 'select',
      options: getCategoriaArticulos(data?.relacion?.articulosCategoria),
      fullWidth: true
    },
    {
      name: 'controL_MAX_MIX',
      label: 'Mínimos y máximos',
      type: 'checkbox',
      placeholder: 'Mínimos y máximos...'
      // fullWidth: true
    },
    {
      name: 'iD_UOM_PRIMARIA',
      label: 'Unidad de medida',
      type: 'number',
      placeholder: 'Escribe la unidad de medida...'
      // fullWidth: true
    },
    {
      name: 'inV_MINIMO',
      label: 'Mínimos',
      type: 'number',
      placeholder: 'Ingresa el mínimo...'
    },
    {
      name: 'inV_MAXIMO',
      label: 'Máximo',
      type: 'number',
      placeholder: 'Ingresa el máximo...'
    },
    {
      name: 'activO_FIJO',
      label: 'Activo fijo',
      type: 'checkbox',
      placeholder: 'Activo fijo...'
    },
    {
      name: 'iD_CATEGORIA_ACTIVO',
      label: 'Categoría activo',
      type: 'select',
      options: getCategoriaActivos(data?.relacion?.articulosCategoriaAct)
      // fullWidth: true
    },
    {
      name: 'transF_INVENTARIOS',
      label: 'Transferencia inventarios',
      type: 'checkbox',
      placeholder: 'Transferencia de inventarios...'
      // fullWidth: true
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    item: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    descripcion: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    iD_CATEGORIA: Yup.number().required('Este campo es requerido'),
    iD_CATEGORIA_ACTIVO: Yup.number().required('Este campo es requerido')
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
