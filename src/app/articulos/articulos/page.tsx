'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

export default function Articulos({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'articulos.lista',
    'articulos.save',
    'articulos.listaid'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('articulos', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Artículos KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ITEM'
    },
    {
      name: 'item',
      label: 'Codigo'
    },
    {
      name: 'descripcion',
      label: 'Articulo'
    },
    {
      name: 'nombrE_UNIDAD_PRIMARIA',
      label: 'Unidad'
    },
    {
      name: 'nombrE_CATEGORIA',
      label: 'Categoría'
    },
    {
      name: 'nombrE_SUBCATEGORIA',
      label: 'Subcategoría'
    },
    {
      name: 'transF_INVENTARIOS',
      label: 'Transferencia'
    },
    {
      name: 'controL_MAX_MIX',
      label: 'Min Max'
    },
    {
      name: 'inV_MINIMO',
      label: 'Inv MIN'
    },
    {
      name: 'inV_MAXIMO',
      label: 'Inv MAX'
    },
    {
      name: 'activO_FIJO',
      label: 'Activo fijo'
    },
    {
      name: 'nombrE_CATEGORIA_ACTIVO',
      label: 'Categoria activo'
    },
    {
      name: 'codigO_SAT',
      label: 'Cod SAT'
    },
    {
      name: 'estatus',
      label: 'Activo',
      component: (activo: boolean) => (
        <div className='w-28'>
          <StatusBullet
            size='medium'
            status={activo ? 'success' : 'disabled'}
            text={activo ? 'Si' : 'No'}
          />
        </div>
      )
    }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='articulos.lista'>
        <Pager
          pageSize={10}
          currentPage={Number(searchParams?.page) || 1}
          totalCount={10 * data?.maximoPaginas}
        >
          <>
            <Search getValue={setValueSearch} showBtnSearch showIcon />
            <DataViewer
              isLoading={isLoading}
              isError={isError}
              title='Artículos'
              idColumn='iD_ITEM'
              nuevo={checked['articulos.save']}
              createHref='articulos/articulos'
              singleHref={checked['articulos.listaid'] && 'articulos/articulos'}
              cols={tableHeaders}
              data={data?.listado?.map((articulo: any, index: any) => ({
                ...articulo,
                transF_INVENTARIOS: articulo.transF_INVENTARIOS ? 'Si' : 'No',
                controL_MAX_MIX: articulo.controL_MAX_MIX ? 'Si' : 'No',
                activO_FIJO: articulo.activO_FIJO ? 'Si' : 'No'
              }))}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
