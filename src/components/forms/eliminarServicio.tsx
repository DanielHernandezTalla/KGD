import React, { useContext } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/toast';

export const FormEliminarServicio = ({
  initialValues,
  isEditForm,
  url,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  url: string;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const formInputs: FORMINPUT[] = [
    {
      name: 'eliminar',
      label: 'Eliminar',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    eliminar: Yup.boolean().oneOf([true], 'Debe marcar como pagado').required('Es requerido')
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
          usuarios_id: user?.id
        };
        handlePost({
          url: url,
          values,
          method: 'DELETE',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    >
      <div className='col-span-4 rounded-md bg-red-100 p-3'>
        <p className='text-lg text-slate-600'>
          El servicio se eliminara del paciente, y se haran modificaciones en la
          <b className='ml-1'>cita</b> en la que este asginado.
        </p>
      </div>
    </Form>
  );
};
