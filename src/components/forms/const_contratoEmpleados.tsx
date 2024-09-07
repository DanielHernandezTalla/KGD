import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import {
  getAreas,
  getCiudades,
  getEstados,
  getMotivoBaja,
  getTiposDePago,
  getTiposDeSalario
} from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormContratoEmpleados = ({
  initialValues,
  url,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('empleados/relacion');

  // console.log(initialValues);

  const formInputs: FORMINPUT[] = [
    {
      name: 'fechA_INGRESO',
      label: 'Fecha ingreso',
      type: 'date',
      placeholder: 'Escribe la fecha de ingreso...'
    },
    {
      name: 'fechA_ANTIGUEDAD',
      label: 'Fecha de antiguedad',
      type: 'date',
      placeholder: 'Escribe la fecha de antiguedad...'
    },
    {
      name: 'iD_AREA',
      label: 'Area',
      type: 'select',
      options: getAreas(data?.relacion?.areas)
    },
    {
      name: 'iD_TIPO_PAGO',
      label: 'Tipo de pago',
      type: 'select',
      options: getTiposDePago(data?.relacion?.tipopago)
    },
    {
      name: 'iD_TIPO_SALARIO',
      label: 'Tipo de salario',
      type: 'select',
      options: getTiposDeSalario(data?.relacion?.tiposalario)
    },
    {
      name: 'iD_MOTIVO_BAJA',
      label: 'Motivo de baja',
      type: 'select',
      options: getMotivoBaja(data?.relacion?.motivoBaja)
    },
    {
      name: 'fechA_FINIQUITO',
      label: 'Fecha finiquito',
      type: 'date'
    },
    {
      name: 'correo',
      label: 'Correo',
      type: 'text',
      placeholder: 'Escribe el correo...'
    },
    {
      name: 'celular',
      label: 'Celular',
      type: 'text',
      placeholder: 'Escribe el celular...'
    },
    {
      name: 'telefonO_EMERGENCIA',
      label: 'Telefono de emergencia',
      type: 'text',
      placeholder: 'Escribe el telefono de emergencia...'
    }
    // {
    //   name: 'iD_ENTIDAD',
    //   label: 'Entidad',
    //   type: 'select',
    //   options: getEstados(data?.relacion?.estados),
    //   fullWidth: true
    // },
    // {
    //   name: 'iD_CIUDAD',
    //   label: 'Ciudad',
    //   type: 'select',
    //   options: getCiudades(data?.relacion?.ciudades, estado),
    //   fullWidth: true
    // }
  ];

  const validationSchema = Yup.object().shape({
    fechA_INGRESO: Yup.string().required('Este campo es requerido'),
    // fechA_INGRESO: Yup.string().required('Este campo es requerido'),
    iD_AREA: Yup.string().required('Este campo es requerido'),
    iD_TIPO_PAGO: Yup.string().required('Este campo es requerido'),
    iD_TIPO_SALARIO: Yup.string().required('Este campo es requerido'),
    correo: Yup.string().required('Este campo es requerido')
  });

  return (
    <Form
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      isBackOnCancel={false}
      closeModal={closeModal}
      onSubmit={(values) => {
        values = {
          ...values,
          creadO_POR: 3,
          fechA_FINIQUITO: values.fechA_ANTIGUEDAD ? values.fechA_ANTIGUEDAD : '1900-01-01',
          fechA_ANTIGUEDAD: values.fechA_ANTIGUEDAD ? values.fechA_ANTIGUEDAD : '1900-01-01'
        };

        // console.log('----------------------');
        // console.log(values);

        handlePost({
          url,
          values,
          method: 'PUT',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    />
  );
};
