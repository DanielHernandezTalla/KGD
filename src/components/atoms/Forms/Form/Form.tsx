'use client';
import { useRouter } from 'next/navigation';
import { Field, Formik, Form, FormikProps } from 'formik';
import { AnyObjectSchema } from 'yup';
import { Button, Input } from '@/components/atoms/';
import { FORMINPUT } from '@/interface/types';
import { useState } from 'react';

interface FormProps {
  txtButton?: string;
  sizeBtn?: 'small' | 'medium' | 'large';
  isEditForm?: boolean;
  formInputs?: FORMINPUT[];
  initialValues: any;
  disabledBtn?: boolean;
  onChange?: (props: any) => void | undefined;
  validationSchema?: AnyObjectSchema;
  onSubmit?: (value: any) => void;
  children?: any;
  cancelButton?: boolean;
  cancelButtonText?: string;
  cancelButtonOnClick?: (router: any) => any;
  submitButton?: boolean;
  submitButtonText?: string;
  disabledValues?: boolean;
  isBack?: any;
  isBackOnCancel?: boolean;
  closeModal?: (value: any) => void;
  permisoToEdit?: boolean;
}

const CustomForm = ({
  txtButton,
  sizeBtn,
  isEditForm,
  disabledBtn,
  formInputs,
  initialValues,
  onChange,
  validationSchema,
  onSubmit,
  cancelButton,
  cancelButtonOnClick = (router: any) => {
    if (isBackOnCancel) {
      router.back();
    } else {
      if (closeModal) closeModal(false);
    }
  },
  submitButton,
  children,
  closeModal,
  isBack,
  isBackOnCancel = true,
  permisoToEdit = true
}: FormProps) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(isEditForm);

  const backPage = () => {
    cancelButtonOnClick(router);
  };

  return (
    <>
      {permisoToEdit ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (onSubmit) {
              if (isBack) values = { ...values, isBack: backPage };
              onSubmit(values);
              if (closeModal && isBackOnCancel) {
                closeModal(false);
              }
            }
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(props: FormikProps<any>) => (
            <div className='mx-auto max-w-form rounded-xl border-2 bg-white p-6 first-line:border-blue-200'>
              {isEditForm && (
                <Button
                  text='Habilitar Edición'
                  variant='green'
                  size='small'
                  className='mb-8'
                  onClick={() => setIsEditable(!isEditable)}
                />
              )}
              <Form onChangeCapture={onChange} onSubmit={props.handleSubmit}>
                <>
                  <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
                    {formInputs &&
                      formInputs.map((input: FORMINPUT) =>
                        input.type == 'select' ||
                        input.type == 'textarea' ||
                        input.type == 'selectmultiple' ? (
                          <Field
                            key={input.name}
                            name={input.name}
                            className='border-solid border-2 px-3 py-1 pb-2 rounded-md w-full'
                            type={input.type}
                            label={input.label}
                            min={input.min}
                            placeholder={input.placeholder}
                            component={Input}
                            options={input.options}
                            fullWidth={input.fullWidth}
                            disabled={isEditable || input.disabled}
                          />
                        ) : (
                          <Field
                            key={input.name}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            min={input.min}
                            placeholder={input.placeholder}
                            component={Input}
                            options={input.options}
                            fullWidth={input.fullWidth}
                            disabled={isEditable || input.disabled}
                          />
                        )
                      )}
                    {children}
                  </div>
                  {(submitButton || cancelButton) && (
                    <div className='mt-9 flex gap-3'>
                      {cancelButton && (
                        <Button
                          text='Cancelar'
                          fullWidth
                          type='button'
                          variant='outline'
                          size='medium'
                          onClick={() => cancelButtonOnClick(router)}
                        />
                      )}
                      {submitButton && (
                        <Button
                          text={txtButton || 'Guardar'}
                          fullWidth
                          type='submit'
                          variant='primary'
                          size={sizeBtn || 'medium'}
                          disabled={isEditable || disabledBtn || !props.errors}
                        />
                      )}
                    </div>
                  )}
                </>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (onSubmit) {
              if (isBack) values = { ...values, isBack: backPage };
              onSubmit(values);
              if (closeModal && isBackOnCancel) {
                closeModal(false);
              }
            }
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(props: FormikProps<any>) => (
            <div className='mx-auto max-w-form rounded-xl border-2 bg-white p-6 first-line:border-blue-200'>
              <Form onChangeCapture={onChange} onSubmit={props.handleSubmit}>
                <>
                  <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
                    {formInputs &&
                      formInputs.map((input: FORMINPUT) =>
                        input.type == 'select' ||
                        input.type == 'textarea' ||
                        input.type == 'selectmultiple' ? (
                          <Field
                            key={input.name}
                            name={input.name}
                            className='border-solid border-2 px-3 py-1 pb-2 rounded-md w-full'
                            type={input.type}
                            label={input.label}
                            min={input.min}
                            placeholder={input.placeholder}
                            component={Input}
                            options={input.options}
                            fullWidth={input.fullWidth}
                            disabled={isEditable || input.disabled}
                          />
                        ) : (
                          <Field
                            key={input.name}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            min={input.min}
                            placeholder={input.placeholder}
                            component={Input}
                            options={input.options}
                            fullWidth={input.fullWidth}
                            disabled={isEditable || input.disabled}
                          />
                        )
                      )}
                    {children}
                  </div>
                  {(submitButton || cancelButton) && (
                    <div className='mt-9 flex gap-3'>
                      {cancelButton && (
                        <Button
                          text='Cancelar'
                          fullWidth
                          type='button'
                          variant='outline'
                          size='medium'
                          onClick={() => cancelButtonOnClick(router)}
                        />
                      )}
                    </div>
                  )}
                </>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default CustomForm;
