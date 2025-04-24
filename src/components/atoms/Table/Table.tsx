'use client';
import { TABLECOLUMN, TABLECOLUMNTOTAL } from '@/interface/types';
import { Button } from '@/components/atoms';

import clsx from 'clsx';
import Link from 'next/link';
import { toMoney } from '@/utils/toMoney';
import { useState } from 'react';
import ColumnFilter from '../ColumnFilter';
import { Filter } from '@/utils/filtersUtils';

export type AlineacionTabla = 'left' | 'balanced';

interface TableProps {
  idColumn?: string;
  cols: TABLECOLUMN[];
  data: any[];
  href?: string;
  className?: string;
  getValue?: (() => void) | ((value: any) => void);
  urlViewMore?: any;
  colsTotal?: TABLECOLUMNTOTAL[];
  alineacion?: AlineacionTabla;
  small?: boolean;
  setCurrentFilters?: (value: Filter[]) => void;
  currentFilters?: Filter[];
}

export interface RowState {
  isHover: boolean;
  rowData: any;
}

const Table: React.FC<TableProps> = ({
  idColumn,
  cols,
  data,
  href,
  className,
  getValue,
  urlViewMore,
  colsTotal,
  alineacion = 'left',
  small = false,
  setCurrentFilters = () => {},
  currentFilters = []
}) => {
  const [hoverRow, setHoverRow] = useState(undefined as number | undefined);

  const [columnFilterShown, setColumnFilterShown] = useState('');
  const [columnFilterShownInitialValue, setColumnFilterShownInitialValue] = useState(
    undefined as any
  );

  const findCurrentFilterValue = (name: string) => {
    const filter = currentFilters.find((item) => item.name === name);
    return filter ? filter.value : undefined;
  };

  const onSubmitFilter = (filter: Filter | null) => {
    if (filter === null) {
      setColumnFilterShown('');
      return;
    }

    const filterFound = currentFilters.find((item) => item.name === filter.name);

    if (filterFound) {
      // Actualizar
      filterFound.value = filter.value;
      filterFound.label = filter.label;
      setCurrentFilters([...currentFilters]);
    } else {
      // Agregar
      setCurrentFilters([...currentFilters, filter]);
    }

    setColumnFilterShown('');
  };

  return (
    <div
      className={clsx(
        className,
        'shadow-m w-full overflow-x-auto ' +
          (!small ? 'rounded-3xl border-2 border-gray-200 bg-white p-4 md:p-6' : '')
      )}
    >
      <table className='w-full table-auto overflow-y-scroll'>
        <thead className=''>
          <tr className=' bg-gray-100 p-4'>
            {cols.map(
              (col, index) =>
                col.label && (
                  <th
                    className={`px-5 py-4  text-sm font-medium text-gray-400 first:rounded-l-lg last:rounded-r-lg 
                      ${
                        alineacion === 'balanced'
                          ? index === 1
                            ? 'text-left'
                            : index === cols.length - 1
                            ? 'text-right'
                            : 'text-center'
                          : 'text-left'
                      }`}
                    key={col.name}
                  >
                    <div className='flex items-center gap-1'>
                      {col.label}
                      {col.filter && col.filter.showButton && (
                        <div className='relative'>
                          <Button
                            size='x-small'
                            variant='transparent'
                            icon='filter'
                            className='text-gray-300 hover:bg-gray-200/50'
                            onClick={() => {
                              if (columnFilterShown === col.name) setColumnFilterShown('');
                              else {
                                // Buscar el valor actual para ese filtro en la lista de filtros
                                let currentFilterValue = findCurrentFilterValue(col.name);

                                // Si no hay valor, establecer el por defecto para el initialValue
                                if (currentFilterValue === undefined) {
                                  switch (col.filter?.type) {
                                    case 'text':
                                      currentFilterValue = '';
                                      break;
                                    case 'checkbox':
                                      currentFilterValue = false;
                                      break;
                                    case 'number':
                                      currentFilterValue = 0;
                                    case 'select':
                                      currentFilterValue = '';
                                  }
                                }

                                setColumnFilterShownInitialValue(currentFilterValue);
                                setColumnFilterShown(col.name);
                              }
                            }}
                          />
                          {columnFilterShown === col.name && (
                            <div
                              className={`absolute top-full ${
                                index === 0
                                  ? 'left-0'
                                  : index === cols.length - 1
                                  ? 'right-0'
                                  : 'right-[-100px]'
                              }`}
                            >
                              <ColumnFilter
                                type={col.filter.type}
                                name={col.name}
                                label={col.label}
                                onSubmit={onSubmitFilter}
                                initialValue={{ filterValue: columnFilterShownInitialValue }}
                                options={col.filter.options}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr
              className='even:bg-gray-100 hover:bg-blue-300/25 h-full'
              key={i}
              onMouseEnter={() => {
                setHoverRow(i);
              }}
              onMouseLeave={() => setHoverRow(undefined)}
            >
              {cols.map((col, index) => {
                return (
                  col.label && (
                    <td
                      key={col.name}
                      className={`text-xs p-0 h-12
                        ${
                          alineacion === 'balanced' &&
                          (index === 1
                            ? 'text-left'
                            : index === cols.length - 1
                            ? 'text-right'
                            : 'text-center')
                        }`}
                    >
                      {!getValue ? (
                        <Link href={href && idColumn ? `/${href}/${row[idColumn]}` : '#'} key={i}>
                          <div
                            className={`flex items-center px-5 py-2 h-full ${
                              col.isRight && 'justify-end'
                            }`}
                          >
                            {col.component ? (
                              col.component(
                                col.formatter ? col.formatter(row[col.name]) : row[col.name],
                                { isHover: hoverRow === i, rowData: row } as RowState
                              )
                            ) : col.formatter ? (
                              col.formatter(row[col.name])
                            ) : row[col.name] ? (
                              row[col.name]
                            ) : (
                              <p className='text-gray-400'> – </p>
                            )}
                          </div>
                        </Link>
                      ) : (
                        <div
                          onClick={() =>
                            getValue({
                              ...row
                            })
                          }
                          key={i}
                        >
                          <Link href={href && idColumn ? `/${href}/${row[idColumn]}` : '#'} key={i}>
                            <div
                              className={`flex items-center px-5 py-2 h-full ${
                                col.isRight && 'justify-end'
                              }`}
                            >
                              {col.component ? (
                                col.component(
                                  col.formatter ? col.formatter(row[col.name]) : row[col.name],
                                  { isHover: hoverRow === i, rowData: row } as RowState
                                )
                              ) : col.formatter ? (
                                col.formatter(row[col.name])
                              ) : row[col.name] ? (
                                row[col.name]
                              ) : (
                                <p className='text-gray-400'> – </p>
                              )}
                            </div>
                          </Link>
                        </div>
                      )}
                    </td>
                  )
                );
              })}
            </tr>
          ))}
          {colsTotal && data.length > 0 && (
            <tr className='even:bg-gray-100'>
              {cols.map((col, i) => {
                if (i === 0)
                  return (
                    <td className='bold px-5 py-3 text-xs font-bold text-gray-600' key={col.label}>
                      Total
                    </td>
                  );

                let auxTd = null;

                colsTotal?.forEach((colT) => {
                  if (colT.label === col.name)
                    auxTd = (
                      <td
                        className={
                          (col.isRight ? 'text-right ' : '') +
                          'px-5 py-3 text-xs font-bold text-gray-600'
                        }
                        key={col.label}
                      >
                        {colT.toMoney
                          ? toMoney(
                              data?.reduce((current: any, next: any) => {
                                return current + next[colT.name];
                              }, 0)
                            )
                          : data?.reduce((current: any, next: any) => {
                              return current + next[colT.name];
                            }, 0)}
                      </td>
                    );
                });

                if (auxTd) return auxTd;
                return <td key={col.label}></td>;
              })}
            </tr>
          )}
        </tbody>
      </table>
      {urlViewMore && urlViewMore.length > 0 && (
        <div>
          <Button
            type='button'
            size='small'
            variant='secondary'
            fullWidth
            text='Ver mas'
            isNextLink
            href={urlViewMore}
          />
        </div>
      )}
      {!data ||
        (data.length === 0 && (
          <div className='flex h-40 w-full items-center justify-center'>
            <h3 className='text-xl font-semibold text-gray-400'>No hay registros</h3>
          </div>
        ))}
    </div>
  );
};

export default Table;
