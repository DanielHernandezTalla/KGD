import { Icon, LoadingSpinner } from '@/components/atoms';
import Layout from '@/components/layouts/MainLayout';
import { TitlePage } from '../TitlePage';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';

interface FormLayoutProps {
  title: string;
  rutaToCheck?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  rutaToCheck,
  children,
  isLoading,
  isError
}) => {
  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = title + ' KGD';

    if (rutaToCheck) {
      const rutasToCheck: string[] = [rutaToCheck];
      handrePermisos(rutasToCheck, setChecked);
    }
  }, []);

  return (
    <Layout>
      <TitlePage title={title} />
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>Error</div>
      ) : !rutaToCheck ? (
        <div className='mt-12'>{children}</div>
      ) : rutaToCheck && checked[rutaToCheck] ? (
        <div className='mt-12'>{children}</div>
      ) : (
        <div className='flex flex-col mx-auto gap-2 mt-32 max-w-sm'>
          <Icon icon='ban' className='h-40 text-gray-200'></Icon>
          <h2 className='text-center text-2xl text-gray-300 select-none'>Sin permisos</h2>
          <p className='text-center text-gray-300 select-none'>
            Lo sentimos, pero no cuentas con los permisos necesarios para acceder a este recurso.
          </p>
        </div>
      )}
    </Layout>
  );
};
