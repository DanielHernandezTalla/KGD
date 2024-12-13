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
  getUnidadMedida
} from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormArticulos = ({
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
  const { data }: IDataResponse<any> = useRequest('articulos/relacion');
  const [{ activoFijo, controL_MAX_MIX }, setDataFilter] = useState({
    activoFijo: initialValues?.activO_FIJO || false,
    controL_MAX_MIX: initialValues?.controL_MAX_MIX || false
  });

  const formInputs: FORMINPUT[] = [
    {
      name: 'item',
      label: 'Código',
      type: 'text',
      placeholder: 'Escribe el código...'
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
    },
    {
      name: 'iD_UOM_PRIMARIA',
      label: 'Categoría artículo',
      type: 'select',
      options: getUnidadMedida(data?.relacion?.unidadMedida)
    }
  ];

  if (controL_MAX_MIX) {
    formInputs.push({
      name: 'inV_MINIMO',
      label: 'Mínimos',
      type: 'number',
      placeholder: 'Ingresa el mínimo...'
    });
    formInputs.push({
      name: 'inV_MAXIMO',
      label: 'Máximo',
      type: 'number',
      placeholder: 'Ingresa el máximo...'
    });
  }

  if (!activoFijo) {
    formInputs.push({
      name: 'activO_FIJO',
      label: 'Activo fijo',
      type: 'checkbox',
      placeholder: 'Activo fijo...',
      fullWidth: true
    });
  }

  if (activoFijo) {
    formInputs.push({
      name: 'activO_FIJO',
      label: 'Activo fijo',
      type: 'checkbox',
      placeholder: 'Activo fijo...'
    });
    formInputs.push({
      name: 'iD_CATEGORIA_ACTIVO',
      label: 'Categoría activo',
      type: 'select',
      options: getCategoriaActivos(data?.relacion?.articulosCategoriaAct)
    });
  }

  formInputs.push({
    name: 'transF_INVENTARIOS',
    label: 'Transferencia inventarios',
    type: 'checkbox',
    placeholder: 'Transferencia de inventarios...'
  });

  formInputs.push({
    name: 'estatus',
    label: 'Activo',
    type: 'checkbox'
  });

  const validationSchema = Yup.object().shape({
    item: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    descripcion: Yup.string()
      .min(3, 'El descuento tiene que tener 3 caracteres')
      .required('Este campo es requerido'),
    iD_CATEGORIA: Yup.number().required('Este campo es requerido'),
    iD_UOM_PRIMARIA: Yup.number().required('Este campo es requerido'),
    iD_CATEGORIA_ACTIVO: Yup.number().when('activO_FIJO', ([activO_FIJO]) => {
      if (activO_FIJO) {
        return Yup.number().required('Este campo es requerido');
      } else {
        return Yup.number();
      }
    }),
    inV_MINIMO: Yup.number().when('controL_MAX_MIX', ([controL_MAX_MIX]) => {
      if (controL_MAX_MIX) {
        return Yup.number().required('Este campo es requerido');
      } else {
        return Yup.number();
      }
    }),
    inV_MAXIMO: Yup.number().when('controL_MAX_MIX', ([controL_MAX_MIX]) => {
      if (controL_MAX_MIX) {
        return Yup.number().required('Este campo es requerido');
      } else {
        return Yup.number();
      }
    })
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'activO_FIJO') {
      setDataFilter((rest) => ({
        ...rest,
        activoFijo: props?.target.value === 'false'
      }));
    }

    if (props?.target.name == 'controL_MAX_MIX') {
      setDataFilter((rest) => ({
        ...rest,
        controL_MAX_MIX: props?.target.value === 'false'
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
          creadO_POR: 3,
          inV_MINIMO: values.inV_MINIMO ? values.inV_MINIMO : 0,
          inV_MAXIMO: values.inV_MAXIMO ? values.inV_MAXIMO : 0
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
