'use client';
import { FormEmpleadosPorAlmacen } from '@/components/forms/const_empleadosPorAlmacen';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEmpleado() {
  return (
    <FormLayout title='Registrar Empleado Por Almacen' rutaToCheck='empleadosalmacen.save'>
      <FormEmpleadosPorAlmacen
        initialValues={{
          // iD_EMPLEADOSALMACEN: 0,
          iD_SUCURSAL: '',
          iD_ALMACEN: '',
          iD_EMPLEADO: '',
          estatus: true
        }}
        url='empleadosalmacen'
      />
    </FormLayout>
  );
}
