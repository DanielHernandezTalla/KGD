import { Text, Button, Table } from '@/components/atoms/';
// import { AuthContext } from "@/context/auth/AuthContext";
import { TABLECOLUMN } from '@/interface/types';

interface CrudTableProps {
  title: string;
  idColumn?: string;
  cols: TABLECOLUMN[];
  data: any[];
  createHref?: string;
  singleHref?: string;
}

const CrudTable: React.FC<CrudTableProps> = ({
  title,
  idColumn,
  cols,
  data,
  createHref,
  singleHref
}) => {
  // const { user } = useContext(AuthContext);

  return (
    <section className='max-w-6xl'>
      <div className='mb-4 flex justify-between'>
        <Text variant='heading' text={title} weight='semibold' />
        {/* {(user?.tipo === TipoPersonal.administrador || user?.tipo === TipoPersonal.secretaria) && ( */}
        <Button
          variant='primary'
          icon='plus'
          rounded
          size='small'
          text='Nuevo'
          isNextLink={true}
          href={`/${createHref}/registrar`}
          iconPosition='right'
        />
        {/* )} */}
      </div>
      {data?.length > 0 ? (
        <div>
          <Table
            className='max-h-[709.88px]'
            cols={cols}
            idColumn={idColumn}
            data={data}
            href={singleHref}
          />
        </div>
      ) : (
        <h2 className='text-center text-3xl'>No hay registros</h2>
      )}
    </section>
  );
};

export default CrudTable;
