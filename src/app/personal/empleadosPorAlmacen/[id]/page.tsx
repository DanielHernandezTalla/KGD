'use client';
import { FormEmpleadosPorAlmacen } from '@/components/forms/const_empleadosPorAlmacen';
import { FormMotivoBaja } from '@/components/forms/const_motivoBaja';
import { FormLayout } from '@/components/molecules/FormLayout';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EmpleadosPorAlmacenSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'empleadosalmacen.edit';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `empleadosalmacen/${params.id}`
  );

  // Consultar permisos
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <FormLayout
      title='Modificar empleados por almacen'
      rutaToCheck='empleadosalmacen.listaid'
      isLoading={isLoading}
      isError={isError}
    >
      <FormEmpleadosPorAlmacen
        initialValues={{
          iD_EMPLEADOSALMACEN: data?.dato?.iD_EMPLEADOSALMACEN,
          iD_SUCURSAL: data?.dato?.iD_SUCURSAL,
          iD_ALMACEN: data?.dato?.iD_ALMACEN,
          iD_EMPLEADO: data?.dato?.iD_EMPLEADO,
          estatus: data?.dato?.estatus
        }}
        url='empleadosalmacen'
        isEditForm={true}
        permisoToEdit={checked[rutaToCheck]}
      />
    </FormLayout>
  );
}
