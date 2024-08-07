'use client';
import { FormImplementacionesDeEST } from '@/components/forms/implementacionesDeEstudio';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarImplementacionesDeEstudio = () => {
  return (
    <FormLayout title='Registrar Implementaciones de Estudio'>
      <FormImplementacionesDeEST
        initialValues={{
          estudio_id: '',
          sucursales_id: '',
          productividad: '',
          activo: true
        }}
        url='implementacionesestudios'
      />
    </FormLayout>
  );
};

export default RegistrarImplementacionesDeEstudio;
