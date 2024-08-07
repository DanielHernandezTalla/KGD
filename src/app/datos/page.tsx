import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Datos CIMA'
};

const Datos = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Datos' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='doctor' text='Tipo Estudio' href='/datos/tiposDeEstudio' />
          <ButtonData icon='grupos' text='Estudios' href='/datos/estudios' />
          <ButtonData
            icon='dollarSing'
            text='Implementación Est'
            href='/datos/implementacionesDeEstudio'
          />
          <ButtonData icon='descuentos' text='Descuentos' href='/datos/descuentos' />
          <ButtonData icon='personal' text='Tipo Cliente' href='datos/tiposDeClientes' />
          <ButtonData icon='search' text='Clientes' href='/datos/clientes' />
          <ButtonData icon='aseguradora' text='Sucursales' href='/datos/sucursales' />
          <ButtonData icon='aseguradora' text='Empleados' href='/datos/empleados' />
          {/* <ButtonData icon='hospital' text='Afiliaciones Emp' href='/datos/afiliacionesEmpleados' /> */}
          <ButtonData icon='doctor' text='Medicos' href='/datos/medicos' />
          {/* <ButtonData icon='personal' text='Médico Especialidad' href='datos/medicoEspecialidad' /> */}
          <ButtonData icon='servicios' text='Especialidades' href='/datos/especialidades' />
          <ButtonData icon='paciente' text='Estatus Médico' href='/datos/estatusMedico' />
          <ButtonData icon='hospital' text='Ubicaciones Med' href='/datos/ubicacionesMedicos' />
          <ButtonData icon='grupos' text='Referencias Paciente' href='/datos/referenciasPaciente' />
          <ButtonData icon='billete' text='Modo de Pagos' href='/datos/modosDePagos' />
          <ButtonData icon='hospital' text='Ubicaciones' href='/datos/ubicaciones' />
        </div>
      </div>
    </Layout>
  );
};

export default Datos;
