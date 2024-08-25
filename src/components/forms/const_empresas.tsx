import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getCiudades, getData, getEstados } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormEmpresas = ({
  initialValues,
  url,
  isEditForm
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('empresas/relacion');
  const [{ estado }, setDataFilter] = useState({
    estado: {
      iD_ESTADO: initialValues?.iD_ESTADO || null
    }
  });

  const formInputs: FORMINPUT[] = [
    {
      name: 'razoN_SOCIAL',
      label: 'Razón social',
      type: 'text',
      placeholder: 'Escribe la razón social...',
      fullWidth: true
    },
    {
      name: 'rfc',
      label: 'RFC',
      type: 'text',
      placeholder: 'Escribe el RFC...'
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'text',
      placeholder: 'Escribe el teléfono...'
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
      placeholder: 'Escribe la dirección...',
      fullWidth: true
    },
    {
      name: 'iD_ESTADO',
      label: 'Estado',
      type: 'select',
      options: getEstados(data?.relacion?.estados),
      fullWidth: true
    },
    {
      name: 'iD_CIUDAD',
      label: 'Ciudades',
      type: 'select',
      options: getCiudades(data?.relacion?.ciudades, estado),
      fullWidth: true
    },
    {
      name: 'codigO_POSTAL',
      label: 'C.P.',
      type: 'text',
      placeholder: 'Escribe el codigo postal...'
    },
    {
      name: 'segmentO1',
      label: 'Segmento 01',
      type: 'text',
      placeholder: 'Escribe el segmento 01...'
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox'
    }
  ];

  const validationSchema = Yup.object().shape({
    razoN_SOCIAL: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    iD_CIUDAD: Yup.number().required('Este campo es requerido'),
    iD_ESTADO: Yup.number().required('Este campo es requerido')
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
        console.log('sending');
        
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
