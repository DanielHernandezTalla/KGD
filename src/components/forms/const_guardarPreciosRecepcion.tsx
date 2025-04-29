import React, { useContext } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/toast';

export const FormGuardarPreciosRecepcion = ({
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
      name: 'guardar',
      label: 'Guardar',
      type: 'checkbox',
      fullWidth: true
    }
  ];

  const validationSchema = Yup.object().shape({
    guardar: Yup.boolean().oneOf([true], 'Debe marcar como cerrado').required('Es requerido')
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
        console.log('GUARDANDO CAMBIOS');
        console.log(values);

        handlePost({
          url: url,
          values,
          method: 'POST',
          toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    >
      <div className='col-span-4 rounded-md bg-green-100 p-3'>
        <p className='text-lg text-slate-600'>
          La <b>recepción</b> se guardara con los nuevos cambios de precios y tipo de precios
          {/* , y las <b className='ml-1'>notas</b> que tiene asignadas. */}
        </p>
      </div>
    </Form>
  );
};
