'use client';
import { FormModosDePago } from '@/components/forms/modosDePago';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarModoDePago = () => {
  return (
    <FormLayout title='Registrar Modo De Pago'>
      <FormModosDePago
        initialValues={{
          nombre: '',
          activo: true
        }}
        url='modosdepago'
      />
    </FormLayout>
  );
};

export default RegistrarModoDePago;
