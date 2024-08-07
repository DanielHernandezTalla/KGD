'use client';
import { Button, Icon } from '@/components/atoms';
import { ChangeStatusType } from '@/components/atoms/ArancelCell/ArancelCell';
import ChangeSummary from '@/components/atoms/ChangeSummary';
import Select from '@/components/atoms/Select';
import Layout from '@/components/layouts/MainLayout';
import { Search, TitlePage } from '@/components/molecules';
import ArancelBar from '@/components/molecules/ArancelBar';
import ArancelTable from '@/components/molecules/ArancelTable';
import { groupStyle } from '@/components/molecules/GrupoDeClientes/GrupoDeClientes';
import Modal from '@/components/molecules/Modal';
import { useToast } from '@/hooks/toast';
import { useRequest } from '@/hooks/useRequest';
import { Cliente, GrupoDeClientes, ImplementacionDeEstudio, PrecioDeEstudio } from '@/interface/models';
import { IDataResponse } from '@/interface/request';
import { getData } from '@/utils/dataToSelectOptions';
import { handlePost } from '@/utils/handlePost';
import { useEffect, useReducer, useRef, useState } from 'react';

export interface ArancelDataActions {
  select: (id: string) => void;
  selectOnly: (id: string) => void;
  selectSome: (ids: string[]) => void;
  selectRow: (rowId: number) => void;
  selectOnlyRow: (rowId: number) => void;
  selectColumn: (index: number) => void;
  selectOnlyColumn: (index: number, condition?: (value: PrecioDeEstudio) => boolean) => void;
  deselect: (id: string) => void;
  deselectRow: (rowId: number) => void;
  deselectColumn: (index: number) => void;
  deselectAll: () => void;

  copyPrecio: (id: string) => void;
  uncopyAllPrecios: () => void;

  startModifying: (id: string) => void;
  stopModifying: () => void;
  changeStatus: (id: string, changeStatus: ChangeStatusType) => void;

  getPrecio: (id: string) => PrecioDeEstudio | undefined;
  updatePrecio: (id: string, value: number | null) => void;
  updatePrecios: (ids: string[], value: number | null) => void;
  updateMultiplePrecios: (ids: string[], values: number[] | null[]) => void;

  getCliente: (clienteId: number) => Cliente | undefined;
  addClienteToGrupo: (grupoDeClientesId: number, cliente: Cliente) => void;
  removeClienteFromGrupo: (grupoDeClientesId: number, cliente: Cliente) => void;
  changeStatusCliente: (clienteId: number, changeStatus: ChangeStatusType) => void;

  createGrupo: () => void;
  removeGrupo:() => void;
}

export default function Arancel() {
  const { toast } = useToast()
  const [valueSearch, setValueSearch] = useState({});
  const [valueSearchTipoEstudio, setValueSearchTipoEstudio] = useState({});
  const [valueSearchEtiquetasDeGrupoDeCliente, setValueSearchEtiquetasDeGrupoDeCliente] = useState({});
  const [ reload, setReload ] = useState(0);
  const { data: response , isError, isLoading }: IDataResponse<any> = useRequest('arancel', {
    sucursal_id: 1,
    reload: reload,
    ...valueSearch,
    ...valueSearchTipoEstudio,
    ...valueSearchEtiquetasDeGrupoDeCliente,
  });
  const { data: tipoEstudiosResponse }: IDataResponse<any> = useRequest('form/tipoEstudios');
  const { data: etiquetasDeGrupoResponse }: IDataResponse<any> = useRequest('form/etiquetasDeGrupoDeCliente');

  const [dataInitialized, setDataInitialized] = useState(false);
  const [ editing, setEditing ] = useState(false);

  const [ groupDatailShown, setGroupDatailShown ] = useState(false);
  const [ groupDatailStyle, setGroupDatailStyle ] = useState('list' as groupStyle);

  const [showConfirmEditModal, setShowConfirmEditModal] = useState(false);

  // Validación de la data recibida del arancel
  const [invalidArancelData, setInvalidArancelData] = useState(false);

  // Origin data
  const [estudiosOrigin, setEstudiosOrigin] = useState(undefined as [] | undefined);
  const [gruposOrigin, setGruposOrigin] = useState(undefined as [] | undefined);
  // Form input (data rows y colums headers)
  const [estudios, setEstudios] = useState([] as ImplementacionDeEstudio[]);
  const [grupos, setGrupos] = useState([] as GrupoDeClientes[]);
  const [clientesEliminados, setClientesEliminados] = useState([] as Cliente[]);
  // Form output
  const [precios, setPrecios] = useState([] as PrecioDeEstudio[]);
  const [clientes, setClientes] = useState([] as Cliente[]);

  const [selectedIds, setSelectedIds] = useState([] as string[]);
  const [selected, setSelected] = useState(undefined as { estudio: ImplementacionDeEstudio | undefined, grupo: GrupoDeClientes | undefined } | undefined);

  // Funcionalidad de copiar y pegar
  const [ copiedPrecios, setCopiedPrecios ] = useState([] as PrecioPosition[]);

  type PrecioPosition = {
    precioDeEstudio: PrecioDeEstudio, 
    relativePosition: { X: number, Y: number }
  };

  // Controlador del evento keydown.
  const handleKeyDown = (event: KeyboardEvent) => {
    try {
      if (editing) {
        if (event.ctrlKey && event.key === 'c') {
          copyPrecios();
        }
        else if (event.ctrlKey && event.key === 'v') {
          pastePrecios();
        }
        else if (event.key === 'Escape' || event.key === 'Esc') {
          if (somePreciosModifying()) {
            arancelDataActions.stopModifying();
          }
          else uncopyPrecios();
        }
      }
    }
    catch(e) {
      toast({icon:'error', message:'Algo falló al copiar o pegar precios.'});
    }
  };

  // Referencia al Controlador del evento keydown.
  const handleKeyDownRef = useRef(handleKeyDown);

  // El evento keydown no tiene acceso a el estado actualizado de las variables.
  // Por lo que es necesario actualizar la referencia cuando una de las variables que utiliza cambia.
  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
  }, [editing, copiedPrecios, selectedIds, estudios]);

  // Actualizar cuando haya respuesta
  useEffect(() => {
    try {
      if (response && response.data && response.data.rows && response.data.colums) {
      
        // Validación de la respuesta (nivel respuesta)
        // Tipo de dato
        if (!(response.data.rows instanceof Array) || !(response.data.colums instanceof Array)){
          throw new Error("El tipo de dato no es el esperado.");
        }
        const rows = response.data.rows as [];
        const colums = response.data.colums as [];
  
        // Estructura
        const colsCount = colums.length;
        let preciosCount: number | null = null;
  
        for (let row of rows as any[]) {
          if (preciosCount === null) {
            preciosCount = row.precios_de_estudio.length;
          }
          else {
            if (preciosCount !== row.precios_de_estudio.length) {
              throw new Error("La estructura de la información recibida del arancel es incorrecta.");
            }
          }
        }
        if (preciosCount !== null && preciosCount !== colsCount) {
          throw new Error("La estructura de la información recibida del arancel es incorrecta.");
        } 
  
        // Coherencia
        if (false) {
          // IMPLEMENTAR
          throw new Error("La información recibida del arancel es incoherente.");
        }
  
        // Actualizar
        setEstudiosOrigin(response.data.rows);
        setGruposOrigin(response.data.colums);
        // indicando que no se ha inicializado para que se vuelvan a inicializar las variables
        setDataInitialized(false);
      }
    }
    catch(error) {
      if (error instanceof Error) {
        toast(error.message, "Información no valida", "error", true);
        setInvalidArancelData(true);
      } else {
        toast("Error no controlado", "Información no valida", "error", true);
        setInvalidArancelData(true);
      }
      
    }
    
  }, [response])

  // Inicializar estudios y grupos
  useEffect(() => {
    if (!dataInitialized && estudiosOrigin && gruposOrigin) {
      // Validar estructura de la data y guardar el valor inicial
      const estudiosOrigin_ = estudiosOrigin.map((estudio: ImplementacionDeEstudio) => {
        const nuevoEstudio = {
          ...estudio,
          precios_de_estudio: estudio.precios_de_estudio.map((precioDeEstudio) => {
            return {
              ...precioDeEstudio,
              initialPrecio: precioDeEstudio.precio,
            }
          })
        };
        return nuevoEstudio;
      });
      // Actualizar
      setEstudios(estudiosOrigin_);
      setGrupos(gruposOrigin);
      setDataInitialized(true);
    }
  }, [estudiosOrigin, gruposOrigin, dataInitialized])

  // Actualizar la lista de ids seleccionados
  useEffect(() => {
    const currentSelectedIds: string[] = [];
    estudios.forEach(row => {
      row.precios_de_estudio.forEach(item => {
        if (item.selected) 
          currentSelectedIds.push(item.id);
      })
    })
    setSelectedIds(currentSelectedIds)
  }, estudios);

  // Actualizar la lista de precios (precios modificados)
  useEffect(() => {
    const currentPrecios: PrecioDeEstudio[] = [];
    estudios.forEach(row => {
      row.precios_de_estudio.forEach(item => {
        if (item.changeStatus !== 'none' && item.changeStatus !== undefined) 
        currentPrecios.push(item);
      })
    });
    setPrecios(currentPrecios);
  }, estudios);

  // Actualizar la lista de clientes (clientes modificados)
  useEffect(() => {
    const currentClientes: Cliente[] = [];
    // Buscar cambios en los grupos
    grupos.forEach(grupo => {
      grupo.clientes.forEach(cliente => {
        if (cliente.changeStatus !== 'none' && cliente.changeStatus !== undefined) 
        currentClientes.push(cliente);
      })
    });
    // Buscar cambios en el grupoRemoved
    clientesEliminados.forEach(cliente => {
      if (cliente.changeStatus !== 'none' && cliente.changeStatus !== undefined) 
      currentClientes.push(cliente);
    });
    setClientes(currentClientes);
  }, grupos)

  // Identificar el precio seleccionado actualmente
  useEffect(() => {
    if (!selectedIds || selectedIds.length === 0 || selectedIds.length > 1) {
      setSelected(undefined);
    }
    else {
      const selected = getPrecioDeEstudio(selectedIds[0]);
      if (selected) {
        const estudio = getImplementacionDeEstudio(selected.implementacion_de_estudio_id);
        const grupo = getGrupoDeClientes(selected.grupo_de_clientes_id);
        setSelected({ estudio: estudio, grupo: grupo });
      }
    }
  }, [selectedIds]);

  // Agregar el listener al evento keydown
  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) => handleKeyDownRef.current(event);

    window.addEventListener('keydown', handleKeyDownWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper);
    };
  }, []);

  /**
   * Actualiza el 'estudios' state modificando cada uno de los precios en base al callback "method" pasado por parametro.
   * @param method Una funcion que acepta un PrecioDeEstudio (interface) como argumento. El método setPreciosDeEstudio llama la función "method" para cada precio del estudios y debe retornar el nuevo estado del precio.
   */
  const setPreciosDeEstudio = (
    method: (
      value: PrecioDeEstudio,
      index: number,
      array: PrecioDeEstudio[],
      objectParent: ImplementacionDeEstudio
    ) => PrecioDeEstudio
  ) => {
    setEstudios((prevState) =>
      prevState.map((arancelRow) => ({
        ...arancelRow,
        precios_de_estudio: arancelRow.precios_de_estudio.map((item, index, array) => {
          return method(item, index, array, arancelRow);
        })
      }))
    );
  };

  const getPrecioDeEstudio = (id: string) => {
    for (const arancelRow of estudios) {
      const foundItem = arancelRow.precios_de_estudio.find(item => item.id === id);
      if (foundItem) {
        return foundItem;
      }
    }
  }

  const somePreciosModifying = () => {
    for (const arancelRow of estudios) {
      const modifying = arancelRow.precios_de_estudio.some(item => item.modifying);
      if (modifying) {
        return true;
      }
    }
    return false;
  }

  const getImplementacionDeEstudio = (id: number) => {
    const foundItem = estudios.find(item => item.id === id);
    if (foundItem) {
      return foundItem;
    }
  }

  /**
   * Actualiza el 'grupos' state modificando cada uno de los clientes en base al callback "method" pasado por parametro.
   * @param method Una funcion que acepta un Cliente (interface) como argumento. El método setGruposDeClientes llama la función "method" para cada cliente del grupo de clientes y debe retornar el nuevo estado del cliente.
   */
  const setGruposDeClientes = (
    method: (
      value: Cliente,
      index: number,
      array: Cliente[],
      objectParent: GrupoDeClientes
    ) => Cliente
  ) => {
    setGrupos((prevState) =>
      prevState.map((grupo) => ({
        ...grupo,
        clientes: grupo.clientes.map((item, index, array) => {
          return method(item, index, array, grupo);
        })
      }))
    );
  };

  const getGrupoDeClientes = (id: number) => {
    const foundItem = grupos.find(item => item.id === id);
    if (foundItem) {
      return foundItem;
    }
  }

  const getClienteFromGrupoDeClientes = (clienteId: number) => {
    for (const grupo of grupos) {
      const foundItem = grupo.clientes.find(cliente => cliente.id === clienteId);
      if (foundItem) {
        return foundItem;
      }
    }
  }

  const addClienteToGrupoDeClientes = (grupoDeClientesId: number, cliente: Cliente) => {
    setGrupos((prevState) =>
      prevState.map((grupo) => {
        if (grupo.id === grupoDeClientesId && !grupo.clientes.find((item) => item.id === cliente.id)) {
          grupo.clientes.push(cliente);
        }
        return grupo;
      })
    );
  };

  const removeClienteFromGruposDeClientes = (grupoDeClientesId: number, cliente: Cliente) => {
    setGrupos((prevState) =>
      prevState.map((grupo) => {
        if (grupo.id === grupoDeClientesId) {
          const index = grupo.clientes.findIndex((item) => item.id === cliente.id);
          if (index !== -1) grupo.clientes.splice(index, 1);
        }
        return grupo;
      })
    );
  };

  const getClienteFromGrupoRemoved = (clienteId: number) => {
    const foundItem = clientesEliminados.find(cliente => cliente.id === clienteId);
    if (foundItem) {
      return foundItem;
    }
  }

  const addClienteToGrupoRemoved = (cliente: Cliente) => {
    setClientesEliminados(() => {
      if (!clientesEliminados.find((item) => item.id === cliente.id)) {
        clientesEliminados.push(cliente);
      }
      return clientesEliminados;
    });
  };

  const removeClienteFromGrupoRemoved = (cliente: Cliente) => {
    setClientesEliminados(() => {
      const index = clientesEliminados.findIndex((item) => item.id === cliente.id);
      if (index !== -1) clientesEliminados.splice(index, 1);
      return clientesEliminados;
    });
  };

  // Precios actions
  const arancelDataActions = {
    // Pone la propiedad selected en true para el elemento especificado y en false al resto de elementos.
    selectOnly: (id: string) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : {
              ...precio_de_estudio,
              selected: false
            }
      );
    },
    // Pone la propiedad selected en true para el elemento especificado, sin modificar al resto de elementos.
    select: (id: string) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en true para todos los elementos especificados, sin modificar al resto de elementos.
    selectSome: (ids: string[]) => {
      setPreciosDeEstudio((precio_de_estudio) =>
        ids.includes(precio_de_estudio.id)
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en true para todos los elementos de la row especificada, sin modificar al resto de elementos.
    selectRow: (rowId: number) => {
      setPreciosDeEstudio((precio_de_estudio, index, array, estudio) =>
        estudio.id === rowId
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en true para todos los elementos de la row especificada y en false al resto de elementos.
    selectOnlyRow: (rowId: number) => {
      setPreciosDeEstudio((precio_de_estudio, index, array, estudio) =>
        estudio.id === rowId
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : {
              ...precio_de_estudio,
              selected: false
            }
      );
    },
    // Pone la propiedad selected en true para todos los elementos de la column especificada, sin modificar al resto de elementos.
    selectColumn: (index: number) => {
      setPreciosDeEstudio((precio_de_estudio, item_index) =>
        item_index === index
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en true para todos los elementos de la column especificada y en false al resto de elementos.
    selectOnlyColumn: (index: number, condition?: (value: PrecioDeEstudio) => boolean) => {
      setPreciosDeEstudio((precio_de_estudio, item_index) =>
        item_index === index && (condition ? condition(precio_de_estudio) : true)
          ? {
              ...precio_de_estudio,
              selected: true
            }
          : {
              ...precio_de_estudio,
              selected: false
            }
      );
    },
    // Pone la propiedad selected en false para el elemento especificado, sin modificar al resto de elementos.
    deselect: (id: string) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              selected: false
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en false para el elemento especificado, sin modificar al resto de elementos.
    deselectRow: (rowId: number) => {
      setPreciosDeEstudio((precio_de_estudio, index, array, estudio) =>
        estudio.id === rowId
          ? {
              ...precio_de_estudio,
              selected: false
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en false para el elemento especificado, sin modificar al resto de elementos.
    deselectColumn: (index: number) => {
      setPreciosDeEstudio((precio_de_estudio, item_index) =>
        item_index === index
          ? {
              ...precio_de_estudio,
              selected: false
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad selected en false para todos los elementos.
    deselectAll: () => {
      setPreciosDeEstudio(precio_de_estudio => ({
        ...precio_de_estudio,
        selected: false
      }));
    },

    // Pone la propiedad copied en true para el elemento especificado, sin modificar al resto de elementos.
    copyPrecio: (id: string) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              copied: true
            }
          : precio_de_estudio
      );
    },
    // Pone la propiedad copied en false para todos los elementos.
    uncopyAllPrecios: () => {
      setPreciosDeEstudio(precio_de_estudio => ({
        ...precio_de_estudio,
        copied: false
      }));
    },
    

    // Pone la propiedad modifying en true para el elemento especificado y en false al resto de elementos.
    startModifying: (id: string) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              modifying: true
            }
          : {
              ...precio_de_estudio,
              modifying: false
            }
      );
    },
    // Pone la propiedad modifying en false para todos los elementos.
    stopModifying: () => {
      setPreciosDeEstudio(precio_de_estudio => ({
        ...precio_de_estudio,
        modifying: false
      }));
    },

    changeStatus: (id: string, changeStatus: ChangeStatusType) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
          ? {
              ...precio_de_estudio,
              changeStatus: changeStatus
            }
          : precio_de_estudio
      );
    },

    getPrecio(id: string) {
      return getPrecioDeEstudio(id);
    },

    updatePrecio: (id: string, precio: number | null) => {
      setPreciosDeEstudio(precio_de_estudio =>
        precio_de_estudio.id === id
        ? {
            ...precio_de_estudio,
            precio: precio
          }
        : precio_de_estudio
      );
    },

    updatePrecios: (ids: string[], precio: number | null) => {
      setPreciosDeEstudio(precio_de_estudio =>
        ids.includes(precio_de_estudio.id)
        ? {
            ...precio_de_estudio,
            precio: precio
          }
        : precio_de_estudio
      );
    },

    updateMultiplePrecios: (ids: string[], precios: (number | null)[]) => {
      if (ids.length !== precios.length) throw new Error("Es necesario especificar la misma cantidad de 'ids' y 'precios' en una actualización multiple de precios.");

      // Optimizar: Hacer lineal la condición, es decir que se pregunte por id en base a una variable i incremental.
      setPreciosDeEstudio(precio_de_estudio => {
        if (ids.includes(precio_de_estudio.id)) {
          const index = ids.indexOf(precio_de_estudio.id)
          return ({
            ...precio_de_estudio,
            precio: precios[index]
          })
        }
        else return precio_de_estudio
      });
    },

    getCliente: (clienteId: number) => {
      // Buscar el cliente en los grupos de clientes, si no, en el grupo de clientes eliminados
      return getClienteFromGrupoDeClientes(clienteId) || getClienteFromGrupoRemoved(clienteId);
    },

    addClienteToGrupo: (grupoDeClientesId: number, cliente: Cliente) => {
      // Remover de lista de eliminados
      removeClienteFromGrupoRemoved(cliente);
      // Actualizar cliente
      cliente.grupo_de_clientes_id = grupoDeClientesId;
      // Agregar a la lista
      addClienteToGrupoDeClientes(grupoDeClientesId, cliente);
    },

    removeClienteFromGrupo: (grupoDeClientesId: number, cliente: Cliente) => {
      // Remover de la lista
      removeClienteFromGruposDeClientes(grupoDeClientesId, cliente);
      // Actualizar cliente
      cliente.grupo_de_clientes_id = null;
      // Agregar a lista de eliminados
      addClienteToGrupoRemoved(cliente);
    },

    changeStatusCliente: (clienteId: number, changeStatus: ChangeStatusType) => {
      setGruposDeClientes(cliente =>
        cliente.id === clienteId
          ? {
              ...cliente,
              changeStatus: changeStatus
            }
          : cliente
      );
      
      // Actualizar tambien en los clientes eliminados
      const clientes = clientesEliminados.map(cliente =>
        cliente.id === clienteId
          ? {
              ...cliente,
              changeStatus: changeStatus
            }
          : cliente
      )
      setClientesEliminados(clientes);
    },

    createGrupo: () => {
      const nombre = "Test"
      // Agregar columna
      const newGroup = {
        id: -1,
        orden: -1,
        nombre: nombre,
        sucursal_id: 1,
        clientes: [],
        changeStatus: 'new',
      } as GrupoDeClientes;
      grupos.push(newGroup);
      setGrupos(grupos);
      
      for (let estudio of estudios) {
        const newPrecioDeEstudio = {
          id: nombre + "-" + estudio.id,
          implementacion_de_estudio_id: estudio.id,
          grupo_de_clientes_id: -1,
          precio: null,
          activo: true,
          changeStatus: 'none',
          initialPrecio: null,
          modifying: false,
          selected: false,
        } as PrecioDeEstudio;
        estudio.precios_de_estudio.push(newPrecioDeEstudio)
      }

      setEstudios(estudios)
    },

    removeGrupo: () => {}
  };

  const pageHandleClick = (event: React.MouseEvent) => {
    if (!event.ctrlKey) {
      arancelDataActions.deselectAll();
      arancelDataActions.stopModifying();
    }
  };

  const cancelButtonHandleClick = () => {
    // Si hay información cargada
    if (estudiosOrigin && gruposOrigin) {
      // Indicar que no se ha inicializado para que se intente inicializar nuevamente
      setDataInitialized(false);
      //setPrecios([] as PrecioDeEstudio[]);
    }
  }

  const confirmChangesButtonHandleClick = () => {
    const onSuccess = () => {
      setClientesEliminados([]);
      reloadData();
    }

    const preciosOutput = precios.map(precio => ({
      implementacion_de_estudio_id: precio.implementacion_de_estudio_id,
      grupo_de_clientes_id: precio.grupo_de_clientes_id,
      precio: precio.precio,
    }));

    const clientesOutput = clientes.map(cliente => ({
      id: cliente.id,
      grupo_de_clientes_id: cliente.grupo_de_clientes_id,
    }));

    // Realizar solicitud
    handlePost({
      url: 'arancel' + '/update',
      values: {
        precios: preciosOutput,
        clientes: clientesOutput,
      },
      method: 'PUT',
      callback: onSuccess,
      messageOk: "El arancel fue actualizado correctamente.",
      messageError: "Algó falló al intentar guardar los cambios.",
      toast: toast
    })
  }

  const reloadData = () => {
    setReload(reload + 1);
  }

  const editButtonOnClick = () => {
    if (editing) 
      setEditing(false);
    else 
      setShowConfirmEditModal(true);
  }

  const copyPrecios = () => {
    if (!editing) return;

    if (selectedIds.length === 0) return;

    const ids = selectedIds.map(it => it);
    const origenId = selectedIds[0];
    let origen = undefined as undefined | { X: number, Y: number };
    const copying = [] as PrecioPosition[];

    // (Se da por hecho el la lista de selectedIds esta ordenada)

    arancelDataActions.uncopyAllPrecios();

    // Recorrer matriz
    for (let Y = 0; Y < estudios.length; Y++) {
      const preciosDeEstudio = estudios[Y].precios_de_estudio;
      for (let X = 0; X < preciosDeEstudio.length; X++) {
        const current = preciosDeEstudio[X];
        
        if (!origen && current.id === origenId) {
          // Se encontró el origen
          origen = { X: X, Y: Y };
        }

        if (origen && current.id === ids[0]) {
          // Copiar precio
          copying.push({ precioDeEstudio: current, relativePosition: { X: X - origen.X, Y: Y - origen.Y } });
          arancelDataActions.copyPrecio(current.id);
          ids.splice(0, 1);
        }
      }
    }

    if (!origen) {
      toast({icon:'error', message:'No se encontró el punto de origen de los elementos seleccionados.'});
      return;
    }

    setCopiedPrecios(copying);
  }

  const pastePrecios = () => {
    if (!editing) return;

    if (selectedIds.length !== 1) return;
    
    const precios = copiedPrecios.map(it => it);
    const ids = selectedIds.map(it => it);
    const targetId = ids[0];
    let target = undefined as undefined | { X: number, Y: number };
    
    const idsAfectados = [] as string[];
    const nuevosValores = [] as (number | null)[];

    // (Se da por hecho que los precios copiados estan ordenados)

    // Recorrer matriz
    for (let Y = 0; Y < estudios.length; Y++) {
      const preciosDeEstudio = estudios[Y].precios_de_estudio;
      for (let X = 0; X < preciosDeEstudio.length; X++) {
        const current = preciosDeEstudio[X];
        
        if (!target && current.id === targetId) {
          // Se encontró el target
          target = { X: X, Y: Y };
        }

        if (target && precios.length > 0) {
          const relativeX = X - target.X;
          const relativeY = Y - target.Y;

          if (precios[0].relativePosition.X === relativeX && precios[0].relativePosition.Y === relativeY) {
            // Guardar id y nuevo valor de precio
            idsAfectados.push(current.id);
            nuevosValores.push(precios[0].precioDeEstudio.precio);
            precios.splice(0, 1);
          }
        }
      }
    }

    if (precios.length > 0) {
      toast({icon:'warning', title: 'Operación no valida', message:'No fue posible pegar todos los precios.'});
      return;
    }

    // Pegar precios
    //setCopiedPrecios([]); 
    //arancelDataActions.uncopyAllPrecios();
    arancelDataActions.updateMultiplePrecios(idsAfectados, nuevosValores);
    arancelDataActions.selectSome(idsAfectados);
  }

  const uncopyPrecios = () => {
    if (copiedPrecios.length > 0) {
      setCopiedPrecios([]);
      arancelDataActions.uncopyAllPrecios();
    }
  }

  const selectPreciosWithSameValueInColumn = (selected: PrecioDeEstudio) => {
    let columnIndex: number = grupos.findIndex((column) => column.id === selected.grupo_de_clientes_id);;
    let value: number | null = selected.precio;
    arancelDataActions.selectOnlyColumn(columnIndex, (precioDeEstudio: PrecioDeEstudio) => value === precioDeEstudio.precio);
  }

  return (
    <Layout onClick={pageHandleClick} full>
      <div className='flex h-full min-h-full flex-col gap-7 mb-6'>
        <h1 className='text-3xl font-medium capitalize text-slate-800 md:text-4xl'>Arancel</h1>
        <div className='flex flex-col gap-4'>
          <Search getValue={setValueSearch} showBtnSearch showIcon disabled={editing} className='w-full'/>
          <div className='flex flex-col lg:flex-row items-end justify-between gap-4'>
            <div className='w-full lg:w-1/2 flex gap-4'>
              <Select label='Tipo de estudio:' options={getData(tipoEstudiosResponse?.data?.tipoEstudios)} setValue={(value) => setValueSearchTipoEstudio({tipo_de_estudio_id: value})} className='w-1/2' disabled={editing}></Select>
              <Select label='Grupos:' options={getData(etiquetasDeGrupoResponse?.data?.etiquetasDeGrupoDeCliente)} setValue={(value) => setValueSearchEtiquetasDeGrupoDeCliente({etiqueta_de_grupo_de_cliente_id: value})} className='w-1/2' disabled={editing}></Select>
            </div>
            <div className='w-full lg:w-1/2 flex gap-2 justify-end'>
              {
                groupDatailShown &&
                <Button
                  size='small'
                  variant='secondary'
                  icon={groupDatailStyle === 'tags' ? 'tableCells' : 'tableList'}
                  onClick={() => setGroupDatailStyle(groupDatailStyle === 'tags' ? 'list' : 'tags')}
                  >
                </Button>
              }
              <Button
                size='small'
                variant='secondary'
                icon='userGroup'
                disabled={estudios.length === 0}
                tooltip={groupDatailShown ? 'Ocultar los detalles de los grupos' : 'Mostrar los detalles de los grupos' }
                onClick={() => setGroupDatailShown(!groupDatailShown)}
                className={`${groupDatailShown ? 'bg-blue-200 hover:bg-blue-300' : ''}`}
                >
              </Button>
              <Button 
                size='small'
                variant='secondary'
                text={editing ? "Finalizar edición" : "Editar arancel"}
                disabled={precios.length > 0 || clientes.length > 0 || estudios.length === 0}
                icon={'pen'}
                className=''
                onClick={() => editButtonOnClick()}>  
              </Button>
            </div>
            
          </div>

          
        </div>
        <div className='flex justify-between z-20 sticky top-20 px-5 md:top-0 lg:px-10'>
          <div>

          </div>
          {
            editing &&
            <div className='flex justify-end items-center gap-2 w-full'>
              {
                // Pendiente a implmentar
                /*
                  <Button size='small' variant='secondary' icon='rotateLeft' className='bg-blue-100/100'/>
                  <Button size='small' variant='secondary' icon='rotateRight' className='bg-blue-100/100'/>
                */
              }
              <div className='flex items-center gap-2 px-2 h-12 rounded-2xl border-2 text-sm border-gray-200 bg-white'>
                <Button 
                  size='small'
                  variant='transparent'
                  icon='magnifyingGlassDollar'
                  className={`text-[18px] w-10 ${(!selectedIds || selectedIds.length !== 1) ? 'hover:bg-transparent' : '' }`}
                  disabled={!selectedIds || selectedIds.length !== 1}
                  tooltip='Seleccionar por precios iguales en columna'
                  onClick={(e) => {
                    e.stopPropagation();
                    const selected = getPrecioDeEstudio(selectedIds[0]);
                    if (selected) selectPreciosWithSameValueInColumn(selected);}}/>
              </div>
              <div className='flex items-center gap-2 px-2 h-12 rounded-2xl border-2 text-sm border-gray-200 bg-white'>
                <Button 
                  size='small'
                  variant='transparent'
                  icon='copy'
                  className={`text-[18px] w-10 ${(!selectedIds || selectedIds.length === 0) ? 'hover:bg-transparent' : '' }`}
                  disabled={!selectedIds || selectedIds.length === 0}
                  tooltip='Copiar'
                  onClick={(e) => {e.stopPropagation(); copyPrecios();}}/>
                <Button
                  size='small'
                  variant='transparent'
                  icon='paste'
                  className={`text-[18px] w-10 ${(!copiedPrecios || copiedPrecios.length === 0 || selected === undefined) ? 'hover:bg-transparent' : '' }`}
                  disabled={!copiedPrecios || copiedPrecios.length === 0 || selected === undefined}
                  tooltip='Pegar'
                  onClick={(e) => {e.stopPropagation(); pastePrecios();}}/>
                <Button 
                  size='small'
                  variant='transparent'
                  icon='xmark'
                  className={`text-[18px] w-10 ${(!copiedPrecios || copiedPrecios.length === 0) ? 'hover:bg-transparent' : '' }`}
                  disabled={!copiedPrecios || copiedPrecios.length === 0}
                  tooltip='Dejar de copiar'
                  onClick={(e) => {e.stopPropagation(); uncopyPrecios();}}/>
              </div>
              
              <ArancelBar 
                selectedIds={selectedIds}
                arancelDataActions={arancelDataActions}
              />
          </div>
          }
          
        </div>
        {
          estudios.length !== 0
          ?
            <div className='flex flex-col gap-4'>
              <ArancelTable 
                rows={estudios}
                cols={grupos}
                clientesEliminados={clientesEliminados}
                dataActions={arancelDataActions}
                readOnly={!editing}
                setGroupDatailShown={setGroupDatailShown}
                groupDatailShown={groupDatailShown}
                groupStyle={groupDatailStyle}
              />
              {
                editing &&
                <div className='flex justify-between gap-4'>
                  <div className='flex flex-col gap-2'>
                    <ChangeSummary 
                      changes={precios}
                      title={ (total) => total === 1 ? total + ' cambio en los Precios': total + ' cambios en los Precios' }
                      newsText={ (news) => news === 1 ? 'Se agregó ' + news + ' precio': 'Se agregaron ' + news + ' precios' }
                      modifiedText ={ (modified) => modified === 1 ? 'Se modificó ' + modified + ' precio': 'Se modificaron ' + modified + ' precios' }
                      deletedText ={ (deleted) => deleted === 1 ? 'Se eliminó ' + deleted + ' precio': 'Se eliminaron ' + deleted + ' precios' }
                    />
                    <ChangeSummary 
                      changes={clientes}
                      title={ (total) => total === 1 ? total + ' cambio en los Grupos de clientes': total + ' cambios en los Grupos de clientes' }
                      newsText={ (news) => news === 1 ? 'Se agregó ' + news + ' cliente a un grupo': 'Se agregaron ' + news + ' clientes a uno o más grupos' }
                      modifiedText ={ (modified) => modified === 1 ? 'Se movió ' + modified + ' cliente de grupo': 'Se movieron ' + modified + ' clientes de grupo' }
                      deletedText ={ (deleted) => deleted === 1 ? 'Se quitó ' + deleted + ' cliente de un grupo': 'Se quitaron ' + deleted + ' clientes de uno o más grupos' }
                    />
                  </div>
                  <div className='flex justify-end gap-4'>
                    <Button 
                      size='medium'
                      variant='secondary'
                      text='Cancelar'
                      disabled={precios.length === 0 && clientes.length === 0}
                      onClick={cancelButtonHandleClick} />
                    <Button 
                      size='medium'
                      variant='primary'
                      text='Guardar cambios'
                      disabled={precios.length === 0 && clientes.length === 0}
                      onClick={confirmChangesButtonHandleClick} />
                  </div>
                  
                </div>
              }
              
            </div>
          :
            (
              invalidArancelData ?
              <h2 className='text-center text-3xl'>No es posible mostrar la información</h2>
              :
              <h2 className='text-center text-3xl'>No se encontraron estudios registrados</h2>
            )
        }
        
      </div>

      <div className='bg-white text-gray-600 w-full h-6 border-t-2 absolute bottom-0 left-0 flex justify-between text-[11px]'>
        <div className='h-full'>
        </div>
        <div className='h-full flex items-center px-4'>
          <div className='flex items-center gap-4'>
            {
            selected &&
              <>
                <div className='flex items-center gap-1.5'>
                  <Icon icon='grupos' className='text-[11px]'></Icon>
                  <p>{selected.estudio?.estudio}</p>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Icon icon='userGroup' className='text-[9px]'></Icon>
                  <p>{selected.grupo?.nombre}</p>
                </div>
              </>
            }
            {
            copiedPrecios && 
              <>
                <div className='flex items-center gap-1.5'>
                  <Icon icon='coins' className='text-[10px]'></Icon>
                  <p>{copiedPrecios.length} copiados</p>
                </div>
              </>
            }
            {
            selectedIds && 
              <>
                <div className='flex items-center gap-1.5'>
                  <Icon icon='coins' className='text-[10px]'></Icon>
                  <p>{selectedIds.length} seleccionados</p>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      <Modal 
          title='Confirmar'
          showModal={showConfirmEditModal}
          setShowModal={setShowConfirmEditModal}
          closeCross>
          <div>
            <p>¿Estás seguro de entrar en <b>modo edición</b> del arancel?</p>
            <div className='flex justify-between mt-5'>
              <Button size='small' variant='secondary' text='Cancelar' onClick={() => setShowConfirmEditModal(false)}></Button>
              <Button size='small' variant='primary' text='Confirmar' onClick={() => {setEditing(true); setShowConfirmEditModal(false)}}></Button>
            </div>
          </div>
        </Modal>

    </Layout>
  );
}
