'use client';
import { ArancelDataActions } from '@/app/arancel/page';
import { Button } from '@/components/atoms/';
import ArancelCell from '@/components/atoms/ArancelCell';
import { useToast } from '@/hooks/toast';
import { Cliente, GrupoDeClientes, ImplementacionDeEstudio, PrecioDeEstudio } from '@/interface/models';
import { useEffect, useState } from 'react';
import GrupoDeClientesEditor, { groupStyle } from '../GrupoDeClientes/GrupoDeClientes';

interface ArancelTableProps {
  rows: ImplementacionDeEstudio[];
  cols: GrupoDeClientes[];
  readOnly: boolean;
  groupStyle: groupStyle;
  clientesEliminados: Cliente[];
  setGroupDatailShown: (value: boolean) => void;
  groupDatailShown: boolean;
  dataActions: ArancelDataActions;
}

export default function ArancelTable({ rows, cols, readOnly, groupStyle, clientesEliminados, setGroupDatailShown, groupDatailShown, dataActions }: ArancelTableProps) {
  
  const grupoDeClientesEliminadosInitial: GrupoDeClientes = {
    id: -1,
    orden: -1,
    nombre: "Clientes sin grupo",
    sucursal_id: -1,
    clientes: [],
    changeStatus: 'none',
  };

  const { toast } = useToast();
  const [ invalidSize, setInvalidSize ] = useState(false);
  //const [ groupDatailShown, setGroupDatailShown ] = useState(false);
  const [ grupoDeClientesEliminados, setGrupoDeClientesEliminados ] = useState(grupoDeClientesEliminadosInitial);

  // Cuando la información de rows y cols se cargue
  useEffect(() => {
    // Validación de la información (nivel componente)
    if (rows && cols) {
      const colsCount = cols.length;
      let preciosCount: number | null = null;
      let invalid = false;

      rows.forEach((row) => {
        if (preciosCount === null) {
          preciosCount = row.precios_de_estudio.length;
        }
        else {
          if (preciosCount !== row.precios_de_estudio.length) {
            toast("La cantidad de precios por estudio no es la misma.", "Carga de información incorrecta", "warning");
            setInvalidSize(true);
            invalid = true;
            return;
          }
        }
      })

      if (!invalid && preciosCount !== null && preciosCount !== colsCount) {
        toast("La cantidad de precios por estudio no es la misma que la cantidad de grupos.", "Carga de información incorrecta", "warning");
        setInvalidSize(true);
        return;
      } 
    }
  }, [rows.length, cols.length])

  useEffect(() => {
    if (clientesEliminados) {
      grupoDeClientesEliminados.clientes = clientesEliminados;
      setGrupoDeClientesEliminados(grupoDeClientesEliminados);
    }
  }, [clientesEliminados])

  const rowHandleClick = (event: React.MouseEvent, row: ImplementacionDeEstudio) => {
    if (event.ctrlKey) {
      if (row.precios_de_estudio.every((value) => value.selected)) dataActions.deselectRow(row.id);
      else dataActions.selectRow(row.id);
    } else dataActions.selectOnlyRow(row.id);
    dataActions.stopModifying();
    event.stopPropagation();
  };

  const columnHandleClick = (event: React.MouseEvent, index: number) => {
    if (event.ctrlKey) {
      if (rows.every((item) => item.precios_de_estudio[index].selected))
        dataActions.deselectColumn(index);
      else dataActions.selectColumn(index);
    } else dataActions.selectOnlyColumn(index);
    dataActions.stopModifying();
    event.stopPropagation();
  };

  return (
    <section className='min-w-6xl max-w-full select-none'>
      <div className='shadow-m w-full overflow-x-auto rounded-3xl border-2 border-gray-200 bg-white p-4 md:p-6'>
        {invalidSize ? (
          <div className='py-16'>
            <h2 className='text-center text-3xl'>No es posible mostrar los precios.</h2>
          </div>
        ) : (
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-100 overflow-y-hidden'>
                <th className='flex gap-2 items-center h-20 pl-8 pr-5 py-4 text-left text-sm font-medium rounded-l-lg'>
                  <p>Estudios</p>
                </th>
                {cols?.map((col: GrupoDeClientes, index: number) => (
                  <th key={col.id} className='px-2 text-center text-sm'>
                    {groupDatailShown ? (
                      <GrupoDeClientesEditor 
                        grupo={col}
                        arancelDataActions={dataActions}
                        readOnly={readOnly}
                        style={groupStyle}
                      />
                    ) : (
                      <div className='h-20 w-32 mx-auto'>
                        <div
                          className='h-5 cursor-s-resize rounded-t-lg bg-gradient-to-b hover:from-blue-100 hover:to-transparent'
                          onClick={(event) => {
                            columnHandleClick(event, index);
                          }}
                        ></div>
                        <div className='flex justify-center items-center h-10'>
                          <p className='font-medium line-clamp-2'>{col.nombre}</p>
                        </div>
                      </div>
                    )}
                  </th>
                ))}
                
                <th className='flex items-center px-5 rounded-r-lg'>
                  {
                    groupDatailShown && grupoDeClientesEliminados.clientes.length > 0 && (
                      <GrupoDeClientesEditor
                        grupo={grupoDeClientesEliminados}
                        disabled
                        arancelDataActions={dataActions}
                      />
                    )
                  }
                  {
                    /* PENDIENTE A IMPLEMENTAR (CREAR GRUPOS)
                    !readOnly &&
                    <Button size='small' icon='plus' variant='outline' onClick={() => dataActions.createGrupo()}/>
                    */
                  }
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row: ImplementacionDeEstudio, index: number) => (
                <tr className='even:bg-gray-100' key={index}>
                  <td className='pr-2 text-xs rounded-l-lg w-64'>
                    <div className='w-52 flex'>
                      <div
                        className='w-8 cursor-e-resize rounded-l-lg bg-gradient-to-r hover:from-blue-100 hover:to-transparent'
                        onClick={(event) => {
                          rowHandleClick(event, row);
                        }}
                      ></div>
                      <div className='flex flex-col justify-center w-full h-14'>
                        <p className='line-clamp-2'>{row.estudio}</p>
                        <p className='font-bold line-clamp-1'>{row.tipo_de_estudio}</p>
                      </div>
                    </div>
                  </td>
                  {row?.precios_de_estudio?.map(
                    (precio_de_estudio: PrecioDeEstudio, index: number) => (
                      <td className='px-2 py-2 text-xs' key={index}>
                        <ArancelCell
                          precioDeEstudio={precio_de_estudio}
                          selected={precio_de_estudio.selected}
                          focus={!readOnly && precio_de_estudio.modifying}
                          readOnly={readOnly || !precio_de_estudio.modifying}
                          arancelDataActions={dataActions}
                        />
                      </td>
                    )
                  )}
                  <td className='px-5 py-2 text-xs rounded-r-lg'></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
