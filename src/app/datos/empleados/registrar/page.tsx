'use client';
import { FormEmpleados } from '@/components/forms/empleados';
import { FormLayout } from '@/components/molecules/FormLayout';

const RegistrarEmpleados = () => {
  return (
    <FormLayout title='Registrar Empleado'>
      <FormEmpleados
        initialValues={{
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          celular: '',
          correo: '',
          activo: true
        }}
        url='empleados'
      />
    </FormLayout>
  );
};

export default RegistrarEmpleados;
