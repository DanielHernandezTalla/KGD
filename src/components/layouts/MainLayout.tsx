'use client';
import { NavBar } from '@/components/organisms';
import { AuthContext } from '@/hooks/AuthContext';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { Icon } from '../atoms';

interface LayoutProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  full?: boolean;
}

const MainLayout: React.FC<LayoutProps> = ({ children, onClick, full }) => {
  const authContext = useContext(AuthContext);
  const ruta = usePathname();
  const rutaInicio = '/';
  const [permiso, setPermiso] = useState(undefined as boolean | undefined);

  // Validar permiso de pantalla para el usuario actual.
  const { data: reponse }: IDataResponse<any> = useRequest('usuariopermisourl', {
    iduser: authContext.user?.id,
    routename: ruta
  });

  // console.log(authContext.user?.id);
  // console.log(ruta);
  // console.log(reponse);

  useEffect(() => {
    if (ruta === rutaInicio || ruta === '/auth') {
      setPermiso(true);
    } else {
      // console.log('else');

      if (reponse?.dato?.estatus !== undefined) {
        setPermiso(reponse?.dato?.estatus);
      }
      // setPermiso(true);
    }
  }, [reponse]);

  return (
    <>
      <main>
        <div
          className='relative flex max-h-screen overflow-hidden'
          onClick={(e) => {
            onClick && onClick(e);
          }}
        >
          <NavBar />

          <div className='m-auto max-h-screen min-h-screen w-full overflow-y-auto bg-slate-50 p-5 lg:p-10'>
            <div
              className={`m-auto h-full w-full max-w-6xl pt-[72px] md:p-0 ${
                full ? 'max-w-max' : 'max-w-6xl'
              }`}
            >
              {permiso === undefined ? (
                <div className='flex flex-col mx-auto gap-4 mt-32 max-w-sm'>
                  <h2 className='text-center text-2xl text-gray-300 select-none'>
                    Verificando permisos...
                  </h2>
                </div>
              ) : permiso === true ? (
                <>{children}</>
              ) : (
                <div className='flex flex-col mx-auto gap-2 mt-32 max-w-sm'>
                  <Icon icon='ban' className='h-40 text-gray-200'></Icon>
                  <h2 className='text-center text-2xl text-gray-300 select-none'>Sin permisos</h2>
                  <p className='text-center text-gray-300 select-none'>
                    Lo sentimos, pero no cuentas con los permisos necesarios para acceder a este
                    recurso.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
