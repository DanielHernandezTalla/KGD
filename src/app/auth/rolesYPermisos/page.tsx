'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useContext, useEffect, useState } from 'react';
import { IDataResponse } from '@/interface/request';
import { Button, Icon, LoadingSpinner, StatusBullet } from '@/components/atoms';
import { Aside } from '@/components/molecules/Aside';
import { Cita } from '@/components/atoms/Cita';
import Link from 'next/link';
import { AuthContext } from '@/hooks/AuthContext';
import { handlePost } from '@/utils/handlePost';
import { Permiso } from '@/components/atoms/Permiso';
import Modal from '@/components/molecules/Modal';
import { FormCategoriaPermisos } from '@/components/forms/const_categoriaPermisos';
import { FormPermisos } from '@/components/forms/const_permisos';
import SearchSelect from '@/components/molecules/SearchSelect';
import { useToast } from '@/hooks/toast';
import { FormEventos } from '@/components/forms/const_eventos';

export default function RolesYPermisos({ searchParams }: { searchParams: { page: number } }) {
  const authContext = useContext(AuthContext);
  const { toast } = useToast();

  const [filtros, setFiltros]: any = useState({ rol: 0 });

  const [showModalCategorias, setShowModalCategoria] = useState(false);
  const [showModalPermisos, setShowModalPermisos] = useState(false);
  const [showModalEventos, setShowModalEventos] = useState(false);

  const [categoria, setCategoria]: any = useState(null);
  const [permiso, setPermiso]: any = useState(null);

  const [categorias, setCategorias]: any = useState({});
  const [permisos, setPermisos]: any = useState({});
  const [eventos, setEventos]: any = useState({});

  const [estatusEventos, setEstatusEventos] = useState<{ [key: number]: boolean }>({}); // Definir el tipo de estado

  // Consulta de datos, para cuando se selecciona un rol
  useEffect(() => {
    selectRoles();
  }, [filtros]);

  // Cuando se cierra el modal de categoria permisos
  useEffect(() => {
    if (!showModalCategorias) {
      selectRoles();
    }
  }, [showModalCategorias]);

  // Cuando se cierra el modal de permisos
  useEffect(() => {
    if (!showModalPermisos && categoria != null) {
      selectCategoria(categoria);
    }
  }, [showModalPermisos]);

  // Cuando se cierra el modal de eventos
  useEffect(() => {
    if (!showModalEventos && permiso != null) {
      selectPermiso(permiso);
    }
  }, [showModalEventos]);

  const selectRoles = () => {
    const request = {
      url: 'rolespermiso/rolespermiso',
      values: { iD_ROLES: filtros?.rol },
      onSuccess: (data: any) => {
        console.log(data);
        setCategorias(data.listado);
        setPermisos([]);
        setCategoria(null);
        setPermiso(null);
        setEventos(null);
      },
      onError: () => {
        setCategorias([]);
        setPermisos([]);
        setCategoria(null);
        setPermiso(null);
      }
    };

    handlePost(request);
  };

  const selectCategoria = (idCategoria: number) => {
    setCategoria(idCategoria);
    const request = {
      url: 'rolespermiso/rolespermiso',
      values: { iD_ROLES: filtros?.rol, iD_TIPOPERMISO: idCategoria },
      onSuccess: (data: any) => {
        console.log(data);
        setPermisos(data.listado);
        setPermiso(null);
        setEventos([]);
      }
    };

    handlePost(request);
  };

  const selectPermiso = (idPermiso: number) => {
    setPermiso(idPermiso);

    const request = {
      url: 'rolespermiso/rolespermiso',
      values: { iD_ROLES: 1, iD_TIPOPERMISO: categoria, iD_PERMISO: idPermiso },
      onSuccess: (data: any) => {
        // console.log('SELECT PERMISO===========================');
        // console.log(data);

        setEventos(data.listado);
        setEstatusEventos({});
        // eventos.map((item: any, index: number) =>
        data.listado.map((item: any, index: number) => {
          // console.log(index);
          // console.log(item.iD_PERMISODET);
          setEstatusEventos((prevState) => ({
            ...prevState,
            [item.iD_PERMISODET]: item.permisodeT_ACTIVO
          }));
        });
        // );
      },
      onError: () => {
        // setCategorias([]);
        // setPermisos([]);
        // setCategoria(null);
        // setPermiso(null);
        setEventos([]);
        setEstatusEventos({});
      }
    };
    handlePost(request);
  };

  // ====================================================================
  // ====================================================================
  // Parte encargada del eliminado de datos
  const eliminarCategoria = (idCategoria: number) => {
    console.log('Eliminando categorias ===========================');
    console.log(idCategoria);
    setCategoria(null);
    setPermiso(null);

    handlePost({
      url: 'tipopermisos',
      values: { iD_ROLES: 1, iD_TIPOPERMISO: categoria },
      method: 'DELETE',
      toast,
      onSuccess: () => {
        selectRoles();
      }
    });
  };

  const eliminarPermiso = (idPermiso: number) => {
    setPermiso(null);

    handlePost({
      url: 'permisos',
      values: { iD_ROLES: 1, iD_TIPOPERMISO: categoria, iD_PERMISO: idPermiso },
      method: 'DELETE',
      toast,
      onSuccess: () => {
        selectCategoria(categoria);
      }
    });
  };

  const eliminarEvento = (idEvento: number) => {
    // setPermiso(null);

    console.log('Eliminando evento===================');
    console.log(idEvento);

    console.log({
      iD_ROL: 1,
      iD_TIPOPERMISO: categoria,
      iD_PERMISO: permiso,
      iD_TIPOPERMISODETAIL: idEvento
    });

    handlePost({
      url: 'permisosdetail/rolpermiso',
      values:
        // {
        //   iD_ROLES: 1,
        //   iD_TIPOPERMISO: categoria,
        //   iD_PERMISO: permiso,
        //   iD_PERMISODET: idEvento
        // },
        {
          iD_ROL: 1,
          iD_PERMISO: permiso,
          iD_TIPOPERMISO: categoria,
          id: idEvento
        },
      method: 'DELETE',
      toast,
      onSuccess: () => {
        selectPermiso(permiso);
        // selectCategoria(categoria);
      }
    });
  };

  // ====================================================================
  // ====================================================================
  // Parte encargada de guardar los cambios del estatus del evento
  const actualizarEstatus = () => {
    // console.log('++++++++++++++++++++++++++++++');
    // console.log('actualizarEstatus');
    // console.log(estatusEventos);

    let resultado = Object.keys(estatusEventos).map((key: string) => ({
      id: key, // Asignamos un id incremental (tipo number)
      activo: estatusEventos[parseInt(key)] // Asignamos el valor booleano correspondiente
    }));

    // console.log(typeof resultado);
    // console.log(resultado);
    // console.log(JSON.stringify(resultado));

    // console.log(
    //   Object.fromEntries(Object.entries(resultado).filter(([v]) => v !== '' && v !== null))
    // );

    const request = {
      url: 'permisosdetail/activar',
      values: resultado,
      isCifrado: false,
      onSuccess: (data: any) => {
        // console.log('salio bien');

        selectPermiso(permiso);
      },
      onError: () => {
        // console.log('salio malisimo');
        selectPermiso(permiso);
      }
    };
    handlePost(request);
  };
  // ====================================================================
  // ====================================================================
  // VER COMO USAR ESTA MADRE
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('usuarios/relacion');

  // console.log(estatusEventos);

  return (
    <MainLayout full>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex flex-col gap-5'>
            <SearchSelect
              getValue={setFiltros}
              showBtnSearch
              showIcon
              data={data?.relacion?.roles}
            />
            {/* <SearchSelect></SearchSelect> */}

            <div className='flex max-h-[calc(100vh-140px-1.25rem)] min-h-[calc(100vh-140px-1.25rem)] flex-col gap-5 xl:flex-row w-100'>
              {/* CATEGORIA DE PERMISOS */}
              <Aside className='flex flex-col gap-5 px-4 py-5'>
                <div className='flex justify-between'>
                  <h2 className='text-2xl font-semibold md:text-xl'>Categoria de permisos</h2>
                  <Button
                    text='Nuevo'
                    icon='plus'
                    variant='primary'
                    size='x-small'
                    rounded
                    disabled={filtros?.rol == 0}
                    onClick={() => setShowModalCategoria(true)}
                  />
                </div>
                {categorias?.length > 0 ? (
                  categorias?.map((item: any, index: number) => (
                    <Permiso
                      key={item.iD_TIPOPERMISO}
                      id={item.iD_TIPOPERMISO}
                      select_id={categoria}
                      nombre={item.nombrE_TIPOPERMISO}
                      url={item.tipopermisourl}
                      onClick={() => selectCategoria(item.iD_TIPOPERMISO)}
                      onDelete={() => eliminarCategoria(item.iD_TIPOPERMISO)}
                    />
                  ))
                ) : (
                  <p className='text-center'>No hay categorias</p>
                )}
              </Aside>

              {/* PERMISOS */}
              <Aside className='flex flex-col gap-5 px-4 py-5'>
                <div className='flex justify-between'>
                  <h2 className='text-2xl font-semibold md:text-xl'>Permisos</h2>
                  <Button
                    text='Nuevo'
                    icon='plus'
                    variant='primary'
                    size='x-small'
                    rounded
                    disabled={categoria === null}
                    onClick={() => setShowModalPermisos(true)}
                  />
                </div>

                <div className='flex flex-col gap-5 overflow-y-scroll'>
                  {/* {permisos?.filter((item: any) => item.nombrE_PERMISO != '')?.length > 0 ? ( */}
                  {permisos?.length > 0 ? (
                    permisos
                      ?.filter((item: any) => item.nombrE_PERMISO != '')
                      .map((item: any, index: number) => (
                        <Permiso
                          key={index}
                          id={item.iD_PERMISO}
                          select_id={permiso}
                          nombre={item.nombrE_PERMISO}
                          url={item.permisourl}
                          onClick={() => selectPermiso(item.iD_PERMISO)}
                          onDelete={() => eliminarPermiso(item.iD_PERMISO)}
                        />
                      ))
                  ) : (
                    <p className='text-center'>Sin permisos</p>
                  )}
                </div>
              </Aside>

              {/* EVENTOS */}
              <div className='flex flex-col gap-5 w-[100vw]'>
                <div className='flex justify-between'>
                  <h2 className='text-2xl text-center font-semibold md:text-3xl'>Eventos</h2>
                  <Button
                    text='Nuevo'
                    icon='plus'
                    variant='primary'
                    size='x-small'
                    rounded
                    disabled={permiso === null}
                    onClick={() => setShowModalEventos(true)}
                  />
                </div>

                <div className='grid grid-cols-2 gap-7 max-w-[650px] w-full mx-auto'>
                  {eventos?.length > 0 ? (
                    eventos.map((item: any, index: number) => (
                      <div
                        key={item.iD_PERMISODET}
                        // key={index}
                        className='overflow-hidden group rounded-lg border-2 border-gray-200 bg-white'
                      >
                        <div className='flex items-center justify-between p-4'>
                          <span className='text-lg'>
                            {item.iD_PERMISODET} / {item.nombrE_PERMISODET}{' '}
                            <small>({item.nombrE_TIPOPERMISODET})</small>
                          </span>
                          <input
                            type='checkbox'
                            checked={estatusEventos[item.iD_PERMISODET] ?? false} // Manejo del caso en que no esté definido
                            onChange={(e) => {
                              console.log('HI');

                              setEstatusEventos((prevState) => ({
                                ...prevState,
                                [item.iD_PERMISODET]: e.target.checked
                              }));
                            }}
                            className='w-7 h-7 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded-md mr-2 border focus:ring-blue-500 focus:ring-2'
                          />
                        </div>
                        <div className='flex justify-between bg-gray-100 py-3 px-5'>
                          <b className='text-gray-600'>{item.permisodeturl}</b>{' '}
                          <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <button
                              id='button'
                              className='grid rounded bg-red-100 p-2'
                              onClick={(e) => {
                                e.stopPropagation(); // Detener la propagación del evento
                                eliminarEvento(item.iD_PERMISODET); // Llamar a la función onDelete
                              }}
                            >
                              <Icon className='text-xs text-red-800' icon={'trash'} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='col-span-2'>
                      <div className='flex flex-col mx-auto gap-2 mt-32 max-w-sm'>
                        <Icon icon='ban' className='h-40 text-gray-200'></Icon>
                        <h2 className='text-center text-2xl text-gray-300 select-none'>
                          Sin eventos
                        </h2>
                        <p className='text-center text-gray-300 select-none'>
                          Es necesario seleccionar una categoría y un permiso para visualizar los
                          eventos.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex justify-end items-end h-full'>
                  <Button
                    text={'Guardar'}
                    type='submit'
                    variant='primary'
                    size={'medium'}
                    disabled={permiso === null}
                    onClick={() => actualizarEstatus()}
                  />
                </div>
              </div>
            </div>
          </div>

          {showModalCategorias && (
            //  ===================================
            //  Modal para Agregar categorias
            <Modal
              title='Agregar categoria'
              showModal={showModalCategorias}
              setShowModal={setShowModalCategoria}
              closeCross
            >
              <FormCategoriaPermisos
                initialValues={{
                  iD_TIPOPERMISO: 1,
                  iD_ROL: filtros?.rol,
                  tipopermiso: '',
                  title: '',
                  routE_NAME: '',
                  icon: '',
                  iS_LINK: false,
                  estatus: true
                }}
                closeModal={setShowModalCategoria}
              />
            </Modal>
          )}

          {showModalPermisos && (
            //  ===================================
            //  Modal para agregar permisos
            <Modal
              title='Agregar permiso'
              showModal={showModalPermisos}
              setShowModal={setShowModalPermisos}
              closeCross
            >
              <FormPermisos
                initialValues={{
                  iD_ROL: filtros?.rol,
                  permiso: '',
                  typepermissionS_ID: categoria,
                  permissionsdetails_ID: 0,
                  title: '',
                  route_NAME: '',
                  icon: '',
                  iS_LINK: false,
                  estatus: true
                }}
                url='permisos'
                closeModal={setShowModalPermisos}
              />
            </Modal>
          )}

          {showModalEventos && (
            //  ===================================
            //  Modal para agregar eventos
            <Modal
              title='Agregar evento'
              showModal={showModalEventos}
              setShowModal={setShowModalEventos}
              closeCross
            >
              <FormEventos
                initialValues={{
                  nombre: '',
                  iD_ROL: filtros?.rol,
                  iD_PERMISO: permiso,
                  iD_TIPOPERMISO: categoria,
                  iD_TIPOPERMISODETAIL: 3,
                  routE_NAME: ''
                }}
                url='permisosdetail'
                closeModal={setShowModalEventos}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
}
