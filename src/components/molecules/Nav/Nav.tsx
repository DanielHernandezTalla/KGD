import { NextLink } from '@/components/atoms/';
import { usePermisos } from '@/hooks/PermisosContext';

const Nav = () => {
  
  const { checked } = usePermisos(); // Obtener permisos desde el contexto

  return (
    <nav className='flex h-full w-full flex-col gap-2'>
      <NextLink href='/' text='Inicio' icon='home' />

      {/* {checked['movimientos.recepcion.index'] && <NextLink href='/' text='Inicio' icon='home' />} */}

      {checked['movimientos.movimientos.index'] && (
        <NextLink href='/movimientos' text='Movimientos' icon='faCity' />
      )}
      {checked['empresa.empresa.index'] && (
        <NextLink href='/empresa' text='Empresa' icon='hotel' />
      )}
      {checked['personal.personal.index'] && (
        <NextLink href='/personal' text='Personal' icon='personal' />
      )}
      {checked['articulos.articulo.index'] && (
        <NextLink href='/articulos' text='Articulos' icon='tableList' />
      )}
      {checked['contabilidad.contabilidad.index'] && (
        <NextLink href='/contabilidad' text='Contabilidad' icon='billete' />
      )}
      {checked['auth.auth.index'] && (
        <NextLink href='/auth' text='Auth' icon='faUserShield' />
      )}
    </nav>
  );
};

export default Nav;
