// import { useContext } from "react";
import { NextLink } from '@/components/atoms/';
// import { AuthContext } from '@/context/auth/AuthContext';
// import { TipoPersonal } from '@/utils/types';

const Nav = () => {
  // const { user } = useContext(AuthContext);

  return (
    <nav className='flex h-full w-full flex-col gap-2'>
      <NextLink href='/' text='Inicio' icon='home' />
      {/*<NextLink href='/pacientes' text='Pacientes' icon='paciente' /> */}
      {/* <NextLink href="/medico" text="Médico" icon="doctor" /> */}
      {/* {(user?.tipo === TipoPersonal.medico || user?.tipo === TipoPersonal.administrador) && (
      )} */}
      {/* <NextLink href="/terapeuta" text="Terapeuta" icon="servicios" /> */}
      {/* {(user?.tipo === TipoPersonal.terapeuta || user?.tipo === TipoPersonal.administrador) && (
      )} */}
      {/* <NextLink href='/honorarios' text='Honorarios' icon='aseguradora' /> */}
      {/* {(user?.tipo === TipoPersonal.terapeuta || user?.tipo === TipoPersonal.administrador) && (
        )} */}
      <NextLink href='/empresa' text='Empresa' icon='hotel' />
      {/* <NextLink href='/multiples' text='Multiples' icon='settings' /> */}
      {/* {(user?.tipo === TipoPersonal.administrador || user?.tipo === TipoPersonal.secretaria) && (
      )} */}
      {/* <NextLink href='/arancel' text='Arancel' icon='coins' />
      <NextLink href='/reportes' text='Reportes' icon='reports' /> */}
      {/* <NextLink href='/dashboard' text='Dashboard' icon='dashboard' /> */}
      {/* {(user?.tipo === TipoPersonal.administrador || user?.tipo === TipoPersonal.secretaria) && (
      )} */}
      {/* <NextLink href='/usuarios' text='Usuarios' icon='userGroup' />
      <NextLink href='/perfil' text='Perfil' icon='grupos' /> */}
    </nav>
  );
};

export default Nav;
