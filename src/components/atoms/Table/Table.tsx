import { TABLECOLUMN, TABLECOLUMNTOTAL } from '@/interface/types';
import { Button } from '@/components/atoms';

import clsx from 'clsx';
import Link from 'next/link';
import { toMoney } from '@/utils/toMoney';

interface TableProps {
  idColumn?: string;
  cols: TABLECOLUMN[];
  data: any[];
  href?: string;
  className?: string;
  getValue?: () => void;
  urlViewMore?: any;
  colsTotal?: TABLECOLUMNTOTAL[];
}

const Table: React.FC<TableProps> = ({
  idColumn,
  cols,
  data,
  href,
  className,
  getValue,
  urlViewMore,
  colsTotal
}) => {
  return (
    <div
      className={clsx(
        className,
        'shadow-m w-full overflow-x-auto rounded-3xl border-2 border-gray-200 bg-white p-4 md:p-6'
      )}
    >
      <table className='w-full table-auto overflow-y-scroll'>
        <thead className=''>
          <tr className=' bg-gray-100 p-4'>
            {cols.map(
              (col) =>
                col.label && (
                  <th
                    className='px-5 py-4 text-left text-sm font-medium text-gray-400 first:rounded-l-lg last:rounded-r-lg'
                    key={col.name}
                  >
                    {col.label}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr className='even:bg-gray-100' key={i}>
              {cols.map(
                (col) =>
                  col.label && (
                    <td className='px-5 py-2 text-xs' key={col.name}>
                      {!getValue ? (
                        <Link href={href && idColumn ? `/${href}/${row[idColumn]}` : '#'} key={i}>
                          {col.isRight ? (
                            <div className='text-right'>
                              {col.component ? col.component(row[col.name]) : row[col.name]}{' '}
                            </div>
                          ) : (
                            <div>
                              {col.component ? col.component(row[col.name]) : row[col.name]}{' '}
                            </div>
                          )}
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
                            <p>{col.component ? col.component(row[col.name]) : row[col.name]}</p>
                          </Link>
                        </div>
                      )}
                    </td>
                  )
              )}
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
