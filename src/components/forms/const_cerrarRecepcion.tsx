import React, { useContext } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/toast';

export const FormCerrarRecepcion = ({
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
      name: 'cerrar',
      label: 'Cerrar',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    cerrar: Yup.boolean().oneOf([true], 'Debe marcar como cerrado').required('Es requerido')
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
          usuario_id: user?.id
        };
        handlePost({
          url: url,
          values,
          method: 'PUT',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    >
      <div className='col-span-4 rounded-md bg-green-100 p-3'>
        <p className='text-lg text-slate-600'>
          La recepción se cerrara y afectara los datos correspondientes
          {/* , y las <b className='ml-1'>notas</b> que tiene asignadas. */}
        </p>
      </div>
    </Form>
  );
};
