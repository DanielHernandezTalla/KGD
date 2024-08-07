import React, { useContext } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRouter } from 'next/router';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { useToast } from '@/hooks/toast';

export const FormPagoMultiple = ({
  initialValues,
  isEditForm,
  dataReset,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  dataReset?: any;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data }: IDataResponse<any> = useRequest(`form/modosdepago`);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
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
    }
  ];

  const validationSchema = Yup.object().shape({
    modo_de_pago_id: Yup.number().min(1).required('Este campo es requerido'),
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
          usuarios_id: user?.id
        };
        dataReset([]);
        handlePost({
          url: 'pagos/multiples',
          values,
          method: 'PUT',
          toast,
          closeModal
        });
      }}
    >
      <div className='col-span-4 rounded-md bg-green-100 p-3'>
        <p className='text-lg text-slate-600'>
          Todos los <b className='ml-1'>servicios</b> seleccionados quedaran registrados con la
          misma forma de pago y fecha.
        </p>
      </div>
    </Form>
  );
};
