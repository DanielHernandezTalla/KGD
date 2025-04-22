import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { useEffect, useState } from 'react';

export const SelectAlmacen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const { data }: IDataResponse<any> = useRequest('EmpleadosAlmacen/Asignados');

  // console.log('data');
  // console.log(data?.listado);

  useEffect(() => {
    // Cargar valor inicial desde localStorage si existe
    const savedValue = localStorage.getItem('almacen');
    if (savedValue) {
      setSelectedOption(savedValue);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    localStorage.setItem('almacen', value);
    window.location.reload();
  };

  return (
    <div className='mb-4'>
      <label className='block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white'>
        Almacen
      </label>

      <select
        value={selectedOption}
        onChange={handleChange}
        className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500'
      >
        <option value='-1'>TODOS LOS ALMACENES</option>
        {data?.listado.map((item: any) => (
          <option key={item.iD_ALMACEN} value={item.iD_ALMACEN}>
            {item.almacen}
          </option>
        ))}
      </select>
    </div>
  );
};
