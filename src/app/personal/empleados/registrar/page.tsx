'use client';
import { FormEmpleados } from '@/components/forms/const_empleados';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEmpleado() {
  return (
    <FormLayout title='Registrar Empleado' rutaToCheck='empleados.save'>
      <FormEmpleados
        initialValues={{
          nombre: '',
          apellidO_PATERNO: '',
          apellidO_MATERNO: '',
          fechA_NACIMIENTO: '',
          sexo: '',
          curp: '',
          rfc: '',
          afiliacioN_IMSS: '',
          tipO_SANGRE: '',
          iD_ENTIDAD_NACIMIENTO: '',
          paiS_NACIMIENTO: '',
          nacionalidad: '',
          estatus: true
        }}
        url='empleados'
      />
    </FormLayout>
  );
}
