'use client';
import { FormEmpresas } from '@/components/forms/const_empresas';
import { FormLayout } from '@/components/molecules/FormLayout';

export default function RegistrarEstados() {
  return (
    <FormLayout title='Registrar Empresa' rutaToCheck='empresas.save'>
      <FormEmpresas
        initialValues={{
          razoN_SOCIAL: '',
          rfc: '',
          direccion: '',
          telefono: '',
          iD_CIUDAD: '',
          iD_ESTADO: '',
          codigO_POSTAL: '',
          segmentO1: '',
          estatus: true
        }}
        url='empresas'
      />
    </FormLayout>
  );
}
