import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { useContext } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/toast';

export const FormCitas = ({
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
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const { data }: IDataResponse<any> = useRequest('form/citas');

  const formInputs: FORMINPUT[] = [
    {
      name: 'paciente_id',
      label: 'Paciente',
      type: 'select',
      options: getData(data?.data?.pacientes),
      disabled: true
    },
    {
      name: 'medico_remitente_id',
      label: 'Medico Remitente',
      type: 'select',
      options: getData(data?.data?.medicosRemitentes)
    },
    // {
    //   name: 'sucursal_id',
    //   label: 'Sucursal',
    //   type: 'select',
    //   options: getData(data?.data?.sucursales)
    // },
    {
      name: 'referencia_del_paciente_id',
      label: 'Referencia',
      type: 'select',
      options: getData(data?.data?.referencias)
    },
    {
      name: 'fecha_hora',
      label: 'Fecha y hora',
      type: 'datetime-local',
      placeholder: 'Selecciona la fecha y hora...'
    }
  ];

  if (isEditForm) {
    formInputs.push({
      name: 'finalizada',
      label: 'Finalizar cita',
      type: 'checkbox',
      fullWidth: true
    });
  }

  const validationSchema = Yup.object().shape({
    paciente_id: Yup.number().required('Este campo es requerido'),
    medico_remitente_id: Yup.number().required('Este campo es requerido'),
    // sucursal_id: Yup.number().required('Este campo es requerido'),
    referencia_del_paciente_id: Yup.number().required('Este campo es requerido'),
    fecha_hora: Yup.date().required('Este campo es requerido')
  });

  return (
    <Form
      initialValues={initialValues}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      onSubmit={(values) => {
        values = {
          ...values,
          usuario_id: user?.id,
          sucursal_id: user?.sucursal_id
        };
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
