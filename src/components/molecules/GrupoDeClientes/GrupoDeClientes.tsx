import { Button } from '@/components/atoms';
import { Cliente, GrupoDeClientes } from '@/interface/models';
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../Modal';
import ClienteSelector from '@/components/atoms/ClienteSelector';
import { ArancelDataActions } from '@/app/arancel/page';
import ClienteCell from '@/components/atoms/ClienteCell';
import { useToast } from '@/hooks/toast';

interface GrupoDeClientesProps {
    grupo: GrupoDeClientes;
    readOnly?: boolean;
    disabled?: boolean;
    style?: groupStyle
    arancelDataActions: ArancelDataActions;
}

export type groupStyle = 'list' | 'tags';

export default function GrupoDeClientesEditor({ grupo, readOnly = false, disabled = false, style = 'tags', arancelDataActions }: GrupoDeClientesProps) {
  
  const { toast } = useToast();

  const [ scrollShown, setScrollShown ] = useState(false);
  const [ showModalAddCliente, setShowModalAddCliente ] = useState(false);
  const [ showModalDatailCliente, setShowModalDatailCliente ] = useState(false);
  const [ clienteSeleccionado, setClienteSeleccionado ] = useState(undefined as undefined | Cliente);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ changeStatusColor, setChangeStatusColor ] = useState('');

  const CONTENT_MAX_HEIGTH = 336;

  useEffect(() => {
    // Verificar la altura del elemento al montar el componente y al actualizar el estado
    const verificarAltura = () => {
      if (containerRef.current) {
        const alturaElemento = containerRef.current.offsetHeight;
        if (alturaElemento >= CONTENT_MAX_HEIGTH) {
          setScrollShown(true); 
        } else {
          setScrollShown(false); 
        }
      }
    };

    // Llamar a la función para verificar la altura del elemento
    verificarAltura();

    // Limpiar el event listener al desmontar el componente para evitar pérdida de memoria
    return () => {
      window.removeEventListener('resize', verificarAltura);
    };
  }, [style]); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    switch (grupo.changeStatus) {
        case 'new':
            setChangeStatusColor('bg-green-600');
            break;
        case 'modified':
            setChangeStatusColor('bg-yellow-500');
            break;
        case 'deleted':
            setChangeStatusColor('bg-red-600');
            break;
        default:
            setChangeStatusColor('');
            break;
    }
  }, [grupo.changeStatus]);

  const addCliente = function(clientePosible: Cliente) {
    if (clientePosible) {
      // Recuperar estado actual del cliente
      const clienteEstadoActual = arancelDataActions.getCliente(clientePosible.id);
      const cliente = clienteEstadoActual ? clienteEstadoActual : clientePosible;

      if (cliente.grupo_de_clientes_id) {
        toast('El cliente ya tiene un grupo asignado.', 'No se pudo agregar', 'warning');
        return;
      }

      if (cliente.grupo_de_clientes_id === grupo.id) {
        toast('El cliente ya existe en el grupo.', 'No se pudo agregar', 'warning');
        return;
      }
      
      // Inicializar cliente si es necesario
      if (cliente.initialGrupoDeClientesId === undefined) cliente.initialGrupoDeClientesId = null;
      
      // Agregar al grupo
      arancelDataActions.addClienteToGrupo(grupo.id, cliente);

      setShowModalAddCliente(false);
    }
  }

  const moveCliente = function(clientePosible: Cliente | number) {
    if (clientePosible) {
      // Recuperar el estado actual del cliente (en la aplicación)
      const clienteId = typeof clientePosible === 'number' ? clientePosible : clientePosible.id;
      const cliente = arancelDataActions.getCliente(clienteId);

      if (cliente === undefined) {
        toast('No se encontró el cliente.', 'No se pudo mover', 'warning');
        return;
      }

      if (cliente.initialGrupoDeClientesId === undefined) {
        toast('Se esta intentando mover un cliente no inicializado.', 'No se pudo mover', 'warning');
        return;
      }

      if (!cliente.grupo_de_clientes_id) {
        toast('El cliente no tenía grupo.', 'No se pudo mover', 'warning');
        return;
      }

      if (cliente.grupo_de_clientes_id === grupo.id) {
        //toast('El cliente ya existe en el grupo.', 'No se pudo mover', 'warning');
        return;
      }

      // Eliminar del grupo anterior
      arancelDataActions.removeClienteFromGrupo(cliente.grupo_de_clientes_id, cliente);

      // Agregar al grupo
      arancelDataActions.addClienteToGrupo(grupo.id, cliente);

      setShowModalAddCliente(false);
    }
  }

  const removeCliente = function (clientePosible: Cliente) {
    if (clientePosible) {
      // Recuperar el estado actual del cliente (en la aplicación)
      const cliente = arancelDataActions.getCliente(clientePosible.id);

      if (cliente === undefined) {
        toast('No se encontró el cliente.', 'No se pudo quitar', 'warning');
        return;
      }

      if (cliente.initialGrupoDeClientesId === undefined) {
        toast('Se esta intentando quitar un cliente no inicializado.', 'No se pudo quitar', 'warning');
        return;
      }

      if (!cliente.grupo_de_clientes_id) {
        toast('El cliente no tiene grupo.', 'No se pudo quitar', 'warning');
        return;
      }
      
      // Eliminar del grupo
      arancelDataActions.removeClienteFromGrupo(cliente.grupo_de_clientes_id, cliente);
      
      setShowModalDatailCliente(false);
    }
  }

  const handleOnDrop = function(e: React.DragEvent) {
    const clienteId_string = e.dataTransfer.getData("clienteId_string");
    const clienteId = parseInt(clienteId_string); 
    moveCliente(clienteId);
  }

  const handleDragOver = function(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div 
      className={`relative pt-2 h-96 rounded-lg my-6 ${disabled ? "bg-gray-500/5 opacity-50" : "bg-blue-400/5"}`}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      <div className={`w-2 h-2 rounded absolute right-[8px] top-[-2px] ${changeStatusColor}`}/>

      <div className='flex justify-between pl-4 pr-2 min-h-[44px]'>
        <div className='flex items-center gap-2'>
          <div className={`px-2 py-0.5 rounded-2xl ${disabled ? "bg-gray-300 cursor-default" : "bg-blue-500 cursor-pointer"}`}>
            <p className='text-white font-bold line-clamp-1 flex justify-center items-center'>
              {grupo.nombre}
            </p>
          </div>
          <p className='text-gray-400 font-normal'>
            {grupo.clientes ? grupo.clientes.length : '-'}
          </p>
        </div>
        {
          !disabled && !readOnly && (
            <div>
              <Button
                size='small'
                variant='outline'
                icon='plus'
                className='w-8 text-gray-600 hover:bg-white/50 border-transparent'
                onClick={() => setShowModalAddCliente(true)}
              />
            </div>
          )
        }
        
      </div>
      <div
        className={`flex max-h-[336px]  py-2 px-1
          ${ style === 'list' ? 'flex-col gap-1 mx-4 w-72' : 'flex-wrap justify-center gap-3 w-80' }
          ${ scrollShown && 'overflow-y-scroll' }
        `}
        ref={containerRef}
      >
        {grupo.clientes.map((cliente: Cliente, index: number) => (
          <ClienteCell 
            cliente={cliente}
            key={index}
            arancelDataActions={arancelDataActions}
            readOnly={disabled || readOnly}
            onClick={() => {
              setClienteSeleccionado(cliente);
              setShowModalDatailCliente(true);
            }}
          />
        ))}
      </div>

      {showModalAddCliente && (
        <Modal
          title='Agregar cliente'
          showModal={showModalAddCliente}
          setShowModal={setShowModalAddCliente}
          closeCross
        >
          <ClienteSelector 
            addCliente={addCliente}
            moveCliente={moveCliente}
            arancelDataActions={arancelDataActions} />
        </Modal>
      )}

      {showModalDatailCliente && (
        <Modal
          title={clienteSeleccionado?.nombre}
          showModal={showModalDatailCliente}
          setShowModal={setShowModalDatailCliente}
          closeCross
        >
          <div className='flex flex-col gap-3'>
            <Button 
              size='medium'
              variant='secondary'
              text='Quitar del grupo'
              fullWidth
              onClick={() => { if (clienteSeleccionado) removeCliente(clienteSeleccionado) }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
