'use client';
import { FormArticulos } from '@/components/forms/const_articulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarArticulo() {
  return (
    <FormLayout title='Registrar Artículo'>
      <FormArticulos
        initialValues={{
          item: '',
          descripcion: '',
          iD_UOM_PRIMARIA: '3',
          iD_CATEGORIA: '',
          transF_INVENTARIOS: false,
          controL_MAX_MIX: false,
          inV_MINIMO: 0,
          inV_MAXIMO: 0,
          activO_FIJO: false,
          iD_CATEGORIA_ACTIVO: '',
          codigO_SAT: '',
          estatus: true
        }}
        url='articulos'
      />
    </FormLayout>
  );
}
