import InfoIndex from '@/components/atoms/InfoIndex';
import QuickAction from '@/components/atoms/QuickAction';
import MainLayout from '@/components/layouts/MainLayout';
import { TitlePage } from '@/components/molecules';

export default function Home() {
  return (
    <MainLayout>
      <div className='flex h-full min-h-full flex-col gap-7 xl:flex-row'>
        <div className='flex w-full flex-col gap-5 md:gap-10'>
          <h1>Home</h1>
          {/* <TitlePage title='Inicio' />

          <div className='flex flex-col gap-4 lg:flex-row'>
            <InfoIndex
              title='Pacientes nuevos hoy'
              description='0' //{`${data?.pacientes?.registrados}`}
            />
            <InfoIndex title='Servicios registrados hoy' description='0' />
          </div>

          <div className={`flex flex-col gap-3 md:gap-6`}>
            <h2 className='text-3xl font-medium text-slate-700'>Acciones Rápidas</h2>
            <div className={`grid grid-cols-quickAction gap-3`}>
              <QuickAction
                href='/pacientes/p/registrar'
                text='Registrar Paciente'
                icon='paciente'
              />
              <QuickAction href='/citas/registrar' icon='calendarPlus' text='Registrar Cita' disabled/>
              <QuickAction href='/reportes/diario' icon='folder' text='Reporte diario'/>
            </div>
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
}
