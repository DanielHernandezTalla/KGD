import React, { useContext } from 'react';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { AuthContext } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/toast';

export const FormFactura = ({
  initialValues,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const formInputs: FORMINPUT[] = [
    {
      name: 'factura',
      label: 'Factura',
      type: 'text',
      placeholder: 'Ingrese Factura...',
      fullWidth: true
    }
  ];

  return (
    <Form
      initialValues={{ ...initialValues }}
      formInputs={formInputs}
      cancelButton={true}
      submitButton={true}
      onSubmit={(values) => {
        values = {
          ...values,
          usuario_id: user?.id
        };
        handlePost({
          url: 'citas/editFactura',
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
