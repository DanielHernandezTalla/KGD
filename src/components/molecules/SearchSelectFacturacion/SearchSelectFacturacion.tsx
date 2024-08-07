import { Button, Icon } from '@/components/atoms';
import { useState } from 'react';

interface SearchProps {
  showIcon?: boolean;
  showBtnSearch?: boolean;
  showFilter?: boolean;
  className?: string;
  valueSearch?: any;
  sucursales: any;
  usuarios: any;
  getValue: (value: any) => void;
}

const SearchSelectFacturacion: React.FC<SearchProps> = ({
  showIcon,
  showBtnSearch,
  showFilter,
  className,
  valueSearch,
  sucursales,
  usuarios,
  getValue
}) => {
  const [sucursal, setSucursal] = useState(valueSearch?.sucursal || '');
  const [usuario, setUsuario] = useState(valueSearch?.usuario || '');
  const [fecha, setFecha] = useState(valueSearch?.fecha || '');

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Search para ubicacion */}
      <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        {showIcon && (
          <span className='mr-4 text-2xl text-gray-300'>
            <Icon icon={'search'} />
          </span>
        )}
        <select
          className=' mr-4 block w-full rounded-lg bg-white p-2.5 text-sm text-gray-900'
          value={sucursal}
          onChange={({ target }) => setSucursal(target.value)}
        >
          <option key={-1} value=''>
            En general
          </option>
          {sucursales?.map((element: any) => (
            <option key={element.id} value={element.id}>
              {element.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Input fecha */}
      <div className='flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        <input type='date' value={fecha} onChange={({ target }) => setFecha(target.value)} />
      </div>
      <div className='flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        <input type='date' value={fecha} onChange={({ target }) => setFecha(target.value)} />
      </div>

      {/* Boton */}
      <div className='flex items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        {showBtnSearch && (
          <Button
            text='Buscar'
            variant='green'
            size='small'
            onClick={() =>
              getValue({
                sucursal,
                usuario,
                fecha
              })
            }
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

export default SearchSelectFacturacion;
