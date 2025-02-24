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
          iD_CIUDAD: 1,
          iD_ESTADO: 1,
          paiS_NACIMIENTO: '',
          nacionalidad: '',
          estatus: true
        }}
        url='empleados'
      />
    </FormLayout>
  );
}

// Instrucción INSERT en conflicto con la restricción FOREIGN KEY 'FK_EMPLEADOS_CIUDAD'. 
// El conflicto ha aparecido en la base de datos 'CONSTRUCTORA', tabla 'dbo.CIUDAD', column 'ID_CIUDAD'. Se terminó la instrucción.

// Instrucción INSERT en conflicto con la restricción FOREIGN KEY 'FK_EMPLEADOS_ESTADOS'.
// El conflicto ha aparecido en la base de datos 'CONSTRUCTORA', tabla 'dbo.ESTADOS', column 'ID_ESTADO'. Se terminó la instrucción.
