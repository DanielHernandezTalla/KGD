'use client';
import { FormArticulos } from '@/components/forms/const_articulos';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarArticulo() {
  return (
    <FormLayout title='Registrar Artículo' rutaToCheck='articulos.articulos.store'>
      <FormArticulos
        initialValues={{
          item: '',
          descripcion: '',
          iD_UOM_PRIMARIA: '',
          iD_CATEGORIA: '',
          transF_INVENTARIOS: false,
          controL_MAX_MIX: false,
          inV_MINIMO: '',
          inV_MAXIMO: '',
          activO_FIJO: false,
          iD_CATEGORIA_ACTIVO: undefined,
          codigO_SAT: '',
          estatus: true
        }}
        url='articulos'
      />
    </FormLayout>
  );
}
