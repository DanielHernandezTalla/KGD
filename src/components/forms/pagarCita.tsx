import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormPagarCita = ({
  initialValues,
  url,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  closeModal?: (value: boolean) => any;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest(`form/modosdepago`);

  const [pagarTodo, setPagarTodo] = useState('true');

  const formInputs: FORMINPUT[] = [
    {
      name: 'modo_de_pago_id',
      label: 'Método de pago',
      type: 'select',
      options: getData(data?.data?.modosdepago)
    },
    {
      name: 'fecha_hora',
      label: 'Fecha y hora',
      type: 'datetime-local',
      placeholder: 'Selecciona la fecha y hora...'
    },
    {
      name: 'activo',
      label: 'Pagar todo',
      type: 'checkbox'
    }
  ];
  if (pagarTodo === 'true') {
    formInputs.push({
      name: 'cantidad',
      label: 'Cantidad',
      type: 'number',
      placeholder: 'Escribe la cantidad a pagar...'
    });
  }
  if (pagarTodo === 'false') {
    formInputs.push({
      name: 'cantidad',
      label: 'Cantidad',
      type: 'number',
      disabled: true,
      placeholder: 'Escribe la cantidad a pagar...'
    });
  }

  const validationSchema = Yup.object().shape({
    modo_de_pago_id: Yup.number().min(1).required('Este campo es requerido'),
    cantidad: Yup.number()
      .min(0, 'Tiene que ser un valor mayor que 0')
      .max(initialValues.total, 'La cantidad es mayor al total')
      .required('Este campo es requerido'),
    fecha_hora: Yup.date().required('Este campo es requerido')
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'activo') {
      setPagarTodo(props?.target.value);
    }
  };

  return (
    <Form
      onChange={onChange}
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      onSubmit={(values) => {
        values.activo ? (values = { ...values, cantidad: values.total }) : (values = { ...values });

        handlePost({
          url: isEditForm ? url + '/edit' : url + '/add',
          values,
          method: isEditForm ? 'PUT' : 'POST',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
