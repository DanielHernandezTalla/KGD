'use client';
import { Icon, LoadingSpinner } from '@/components/atoms';

interface PagerProps {
  children: React.ReactElement;
  checked: any;
  name: string;
}

const LayoutPermiso: React.FC<PagerProps> = ({ checked, name, children }) => {
  // const { user } = useContext(AuthContext);

  return (
    <>
      {Object.keys(checked).length == 0 ? (
        <LoadingSpinner />
      ) : checked[name] ? (
        <>{children}</>
      ) : (
        // <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
        <div className='flex flex-col mx-auto gap-2 mt-32 max-w-sm'>
          <Icon icon='ban' className='h-40 text-gray-200'></Icon>
          <h2 className='text-center text-2xl text-gray-300 select-none'>Sin permisos</h2>
          <p className='text-center text-gray-300 select-none'>
            Lo sentimos, pero no cuentas con los permisos necesarios para acceder a este recurso.
          </p>
        </div>
      )}
    </>
  );
};

export default LayoutPermiso;
