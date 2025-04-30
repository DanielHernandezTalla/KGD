'use client';
import { FormTipoSalario } from '@/components/forms/const_tipoSalario';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarTipoSalario() {
  return (
    <FormLayout title='Registrar Tipo Salario' rutaToCheck='tiposalario.save'>
      <FormTipoSalario
        initialValues={{
          tipO_SALARIO: '',
          descripcion: '',
          estatus: true
        }}
        url='tiposalario'
      />
    </FormLayout>
  );
}
