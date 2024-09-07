import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getEstados, getSexo } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormEmpleados = ({
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

  const sexo = [
    { id: 'M', nombre: 'Mujer' },
    { id: 'H', nombre: 'Hombre' }
  ];

  const formInputs: FORMINPUT[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Escribe el nombre del empleado...',
      fullWidth: true
    },
    {
      name: 'apellidO_PATERNO',
      label: 'Apellido paterno',
      type: 'text',
      placeholder: 'Escribe el apellido paterno...'
    },
    {
      name: 'apellidO_MATERNO',
      label: 'Apellido materno',
      type: 'text',
      placeholder: 'Escribe el apellido materno...'
    },
    {
      name: 'fechA_NACIMIENTO',
      label: 'Fecha naciminento',
      type: 'date',
      placeholder: 'Escribe la fecha de nacimiento...'
    },
    {
      name: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: getSexo(sexo)
    },
    {
      name: 'curp',
      label: 'CURP',
      type: 'text',
      placeholder: 'Escribe la curp...'
    },
    {
      name: 'rfc',
      label: 'RFC',
      type: 'text',
      placeholder: 'Escribe el rfc...'
    },
    {
      name: 'afiliacioN_IMSS',
      label: 'Afiliación IMSS',
      type: 'text',
      placeholder: 'Escribe NSS...'
    },
    {
      name: 'tipO_SANGRE',
      label: 'Tipo de sangre',
      type: 'text',
      placeholder: 'Escribe el tipo de sangre...'
    },
    {
      name: 'iD_ENTIDAD_NACIMIENTO',
      label: 'Entidad nacimiento',
      type: 'select',
      options: getEstados(data?.relacion?.estados),
      fullWidth: true
    },
    {
      name: 'paiS_NACIMIENTO',
      label: 'País nacimiento',
      type: 'text',
      placeholder: 'Escribe el país de nacimiento...'
    },
    {
      name: 'nacionalidad',
      label: 'Nacionalidad',
      type: 'text',
      placeholder: 'Escribe la nacionalidad...'
    },
    {
      name: 'estatus',
      label: 'Activo',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre tiene que tener al menos 3 caracteres')
      .required('Este campo es requerido'),
    apellidO_PATERNO: Yup.string()
      .min(3, 'El apellido paterno debe tener al menos 3 caracteres')
      .required('Este campo es requerido'),
    fechA_NACIMIENTO: Yup.string().required('Este campo es requerido'),
    sexo: Yup.string().required('Este campo es requerido'),
    iD_ENTIDAD_NACIMIENTO: Yup.string().required('Este campo es requerido')
  });

  return (
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
        values = {
          ...values,
          creadO_POR: 3,
          fechA_NACIMIENTO: values?.fechA_NACIMIENTO
            ? new Date(values.fechA_NACIMIENTO).toISOString().split('T')[0]
            : null
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
    />
  );
};
