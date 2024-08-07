'use client';
import { FormAfiliacionesEmp } from '@/components/forms/afiliacionesDeEmpleado';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarAfiliacionesDeEmpleado = () => {
  return (
    <FormLayout title='Registrar Afiliaciones de Empleado'>
      <FormAfiliacionesEmp
        initialValues={{
          empleado_id: '',
          sucursales_id: '',
          activo: true
        }}
        url='afiliacionesempleados'
      />
    </FormLayout>
  );
};

export default RegistrarAfiliacionesDeEmpleado;
