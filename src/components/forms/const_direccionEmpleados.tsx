import React, { useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getCiudades, getEstados } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormDireccionEmpleados = ({
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
  const [{ estado }, setDataFilter] = useState({
    estado: {
      iD_ESTADO: initialValues?.iD_ENTIDAD || null
    }
  });

  const formInputs: FORMINPUT[] = [
    {
      name: 'calle',
      label: 'Calle',
      type: 'text',
      placeholder: 'Escribe la calle del empleado...',
      fullWidth: true
    },
    {
      name: 'colonia',
      label: 'Colonia',
      type: 'text',
      placeholder: 'Escribe la colonia del empledo...',
      fullWidth: true
    },
    {
      name: 'nO_EXTERIOR',
      label: 'No Exterior',
      type: 'text',
      placeholder: 'Escribe el numero exterior...'
    },
    {
      name: 'codigO_POSTAL',
      label: 'Codigo Postal',
      type: 'text',
      placeholder: 'Escribe el codigo postal...'
    },
    {
      name: 'iD_ENTIDAD',
      label: 'Entidad',
      type: 'select',
      options: getEstados(data?.relacion?.estados),
      fullWidth: true
    },
    {
      name: 'iD_CIUDAD',
      label: 'Ciudad',
      type: 'select',
      options: getCiudades(data?.relacion?.ciudades, estado),
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    iD_CIUDAD: Yup.string().required('Este campo es requerido'),
    iD_ENTIDAD: Yup.string().required('Este campo es requerido')
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'iD_ENTIDAD') {
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
      isBackOnCancel={false}
      closeModal={closeModal}
      onSubmit={(values) => {
        values = {
          ...values,
          nO_EXTERIOR: values.nO_EXTERIOR ? values.nO_EXTERIOR : null,
          creadO_POR: 3
        };

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
