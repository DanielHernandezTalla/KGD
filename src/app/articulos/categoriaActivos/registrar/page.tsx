'use client';
import { FormCategoriaActivos } from '@/components/forms/const_categoriaActivos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarCategoriaActivo() {
  return (
    <FormLayout title='Registrar categoría activo' rutaToCheck='articulos.activos.store'>
      <FormCategoriaActivos
        initialValues={{
          activo: '',
          descripcion: '',
          tiempO_DEPRECIACION_YEAR: '',
          estatus: true
        }}
        url='articuloscategoriaact'
      />
    </FormLayout>
  );
}
