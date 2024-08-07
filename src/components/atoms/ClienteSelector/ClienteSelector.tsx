import { Cliente } from '@/interface/models';
import React, { useEffect, useState } from 'react'
import { Button } from '..';
import { IDataResponse } from '@/interface/request';
import { useRequest } from '@/hooks/useRequest';
import clsx from 'clsx';
import { ArancelDataActions } from '@/app/arancel/page';

/* ClienteSelector */
export default function ClienteSelector({ addCliente, moveCliente, arancelDataActions }: { addCliente: (cliente: Cliente) => void, moveCliente: (cliente: Cliente) => void, arancelDataActions: ArancelDataActions }) {

  const { data: dataResponse }: IDataResponse<any> = useRequest('form/clientes');
  const [ clientesPosibles, setClientesPosibles ] = useState([] as Cliente[]);
  const [ clientePosibleSeleccionado, setClientePosibleSeleccionado ] = useState(undefined as undefined | Cliente);
  const [ cliente, setCliente ] = useState(undefined as undefined | Cliente);

  useEffect(() => {
    if (dataResponse && dataResponse.data) {
      setClientesPosibles(dataResponse.data.clientes as Cliente[]);
    }
  }, [dataResponse]);

  // Recuperando el estado actual del cliente
  useEffect(() => {
    if (clientePosibleSeleccionado) {
      setCliente(arancelDataActions?.getCliente(clientePosibleSeleccionado.id));
    }
    else {
      setCliente(undefined);
    }
  }, [clientePosibleSeleccionado])

  return (
    <div className='max-h-[calc(100vh-240px)] flex flex-col gap-6'>
      <div className='flex flex-col gap-1 p-2 overflow-y-scroll'>
        {clientesPosibles?.map((clientePosible: Cliente) => (
          <ClienteSelectorElement
            key={clientePosible.id}
            clientePosible={clientePosible}
            clientePosibleSeleccionado={clientePosibleSeleccionado}
            onClick={() => {
              if (clientePosibleSeleccionado && clientePosibleSeleccionado.id === clientePosible.id) {
                setClientePosibleSeleccionado(undefined);
              } else setClientePosibleSeleccionado(clientePosible);
            }}
          />
        ))}
      </div>
      <div className='flex gap-3'>
        <Button
          text={cliente?.grupo_de_clientes_id ? 'Mover' : 'Agregar'}
          fullWidth
          variant='primary'
          size='medium'
          disabled={clientePosibleSeleccionado === undefined}
          onClick={() => {
            if (cliente?.grupo_de_clientes_id) {
              if (moveCliente && clientePosibleSeleccionado) moveCliente(clientePosibleSeleccionado); 
            }
            else {
              if (addCliente && clientePosibleSeleccionado) addCliente(clientePosibleSeleccionado); 
            }
            
          }}
        />
      </div>
    </div>
  );
}

/* ClienteSelectorElement */
function ClienteSelectorElement({ clientePosible, clientePosibleSeleccionado, onClick }: { clientePosible: Cliente, clientePosibleSeleccionado: Cliente | undefined, onClick: () => void }) {

  const [ selected, setSelected ] = useState(false);

  useEffect(() => {
    if (clientePosibleSeleccionado && clientePosibleSeleccionado.id === clientePosible.id) {
      setSelected(true);
    }
    else {
      setSelected(false);
    }
  }, [clientePosibleSeleccionado]);

  const rootClassName = clsx(
    'border-2 py-2 px-4 rounded-lg cursor-pointer',
    {
      'border-blue-300': selected,
      'border-gray-200': !selected,
    }
  );

  return (
    <div className={rootClassName} onClick={onClick}>
      <p className='font-bold text-black text-sm'>{clientePosible.nombre}</p>
      <p className='font-normal text-xs text-gray-400'>{clientePosible.grupo_de_clientes_id ? (<>(en grupo <b>{clientePosible.grupo_de_clientes_nombre}</b>)</>) : "(sin grupo)"}</p>
    </div>
  );
}
