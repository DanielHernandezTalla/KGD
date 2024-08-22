import React, { FC, useContext } from 'react';
import Button from '../Button';
// import { AuthContext } from '../../../context/auth/AuthContext';

interface Props {
  nota: any;
  showEditNote: (nota: string) => void;
}

export const Nota: FC<Props> = ({ nota, showEditNote }) => {
  // const { user } = useContext(AuthContext);

  return (
    <div className='flex max-h-[200px] flex-col justify-between gap-4 rounded-lg border-2 border-blue-300 bg-blue-100 p-3'>
      <div>
        <div className='flex items-center justify-between'>
          <b className='truncate text-lg text-blue-800'>{nota.asunto}</b>

          <span className='text-base text-slate-700'>{nota.fecha}</span>
        </div>
        <span className='text-sm font-semibold text-blue-800 '>Por: {nota.usuario}</span>

        <p className='pt-3 pb-1 text-lg text-slate-600'>{nota.descripcion}</p>
      </div>

      {/* {user?.idPersonal === nota.idPersonal && ( */}
      <Button
        className='self-end text-lg'
        size='small'
        variant='primary'
        text='Modificar'
        icon='pen'
        onClick={() => showEditNote(nota)}
      />
      {/* )} */}
    </div>
  );
};
