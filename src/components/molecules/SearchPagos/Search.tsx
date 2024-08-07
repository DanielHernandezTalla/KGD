'use client';
import { Icon, Button } from '@/components/atoms';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';

interface SearchProps {
  showIcon?: boolean;
  showBtnSearch?: boolean;
  showFilter?: boolean;
  className?: string;
  valueSearch?: any;
  getValue: (value: any) => void;
}

const SearchPagos: React.FC<SearchProps> = ({
  showIcon,
  showBtnSearch,
  showFilter,
  className,
  valueSearch,
  getValue
}) => {
  const params = useParams();

  const { data }: IDataResponse<any> = useRequest('form/searchPagosMultiples');

  const [value, setValue] = useState('');

  const [nombre, setNombre] = useState(params.nombreQ || '');
  const [estudio, setEstudio] = useState(valueSearch?.estudio || '');
  const [estatusPago, setEstatusPago] = useState(params.estatusPagoQ || '');
  // const [fecha, setFecha] = useState(params.fechaQ || '');
  const [fechaInicio, setFechaInicio] = useState(valueSearch?.fechaInicio || '');
  const [fechaFinal, setFechaFinal] = useState(valueSearch?.fechaFinal || '');

  return (
    // <div className={`flex gap-2 ${className}`}>
    //   <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
    //     {showIcon && (
    //       <span className='mr-4 text-2xl text-gray-300'>
    //         <Icon icon={'search'} />
    //       </span>
    //     )}
    //     <input
    //       className='text-md h-full w-full outline-none'
    //       type='text'
    //       placeholder='Buscar...'
    //       onChange={({ target }) => setValue(target.value)}
    //       onKeyPress={({ key }) => {
    //         if (key === 'Enter') {
    //           getValue({
    //             nombre: value
    //           });
    //         }
    //       }}
    //       value={value}
    //     />
    //     {showBtnSearch && (
    //       <Button
    //         text='Buscar'
    //         // type='button'
    //         variant='green'
    //         size='small'
    //         onClick={() => getValue({ nombre: value })}
    //       />
    //     )}
    //   </div>
    //   {showFilter && (
    //     <Button
    //       text='filtros'
    //       iconPosition='left'
    //       align='center'
    //       icon='filter'
    //       variant='secondary'
    //       size='large'
    //     />
    //   )}
    // </div>
    <div className={`flex gap-2 ${className}`}>
      <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        <select
          className=' mr-4 block w-full rounded-lg bg-white p-2.5 text-sm text-gray-900'
          value={estudio}
          onChange={({ target }) => setEstudio(target.value)}
        >
          <option key={-1} value=''>
            Todos los servicios
          </option>
          {data?.data?.estudios?.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Search para nombre */}
      {/* <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        {showIcon && (
          <span className='mr-4 text-2xl text-gray-300'>
            <Icon icon={'search'} />
          </span>
        )}
        <input
          className='text-md h-full w-full outline-none'
          type='text'
          placeholder='Nombre del personal...'
          onChange={({ target }) => setNombre(target.value)}
          autoFocus
          value={nombre}
        />
      </div> */}

      {/* Search para personal */}

      {/* Search para pagado */}
      <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        <select
          className=' mr-4 block w-full rounded-lg bg-white p-2.5 text-sm text-gray-900'
          value={estatusPago}
          onChange={({ target }) => setEstatusPago(target.value)}
        >
          <option key={-1} value='-1'>
            Modo de pago
          </option>
          <option key={1} value='1'>
            No Pagado
          </option>
          <option key={2} value='2'>
            Pagado
          </option>
        </select>
      </div>

      {
        <div className='w-50 flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
          <input
            type='date'
            value={fechaInicio}
            onChange={({ target }) => setFechaInicio(target.value)}
          />
        </div>
      }
      {
        <div className='w-50 flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
          <input
            type='date'
            value={fechaFinal}
            onChange={({ target }) => setFechaFinal(target.value)}
          />
        </div>
      }

      {/* Input fecha */}

      {/* Boton */}
      <div className='flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        {showBtnSearch && (
          <Button
            text='Buscar'
            variant='green'
            size='small'
            onClick={() => {
              getValue({
                estudio,
                fechaInicio,
                fechaFinal
              });
            }}
          />
        )}
      </div>

      {showFilter && (
        <Button
          text='filtros'
          iconPosition='left'
          align='center'
          icon='filter'
          variant='secondary'
          size='large'
        />
      )}
    </div>
  );
};

export default SearchPagos;
