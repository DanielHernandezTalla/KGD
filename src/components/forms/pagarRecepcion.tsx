import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useToast } from '@/hooks/toast';

export const FormPagarRecepcion = ({
  initialValues,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  isEditForm?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  return (
    <Form
      initialValues={initialValues}
      cancelButton={true}
      submitButton={true}
      onSubmit={(values) =>
        handlePost({
          url: 'citas/payReception',
          values,
          method: 'PUT',
          toast,
          closeModal
        })
      }
      isEditForm={isEditForm}
    >
      <div
        className={
          'col-span-4 rounded-md p-3 ' +
          (initialValues.pagada_en_recepcion ? 'bg-red-100' : 'bg-green-100')
        }
      >
        {initialValues.pagada_en_recepcion ? (
          <p className='text-lg text-slate-600'>El pago en recepción sera eliminado</p>
        ) : (
          <p className='text-lg text-slate-600'>La cita quedara como pagada en recepción</p>
        )}
      </div>
    </Form>
  );
};
