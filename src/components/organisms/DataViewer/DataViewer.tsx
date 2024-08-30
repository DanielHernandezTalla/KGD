import { LoadingSpinner } from '@/components/atoms';
import { CrudTable } from '@/components/molecules';
import { TABLECOLUMN } from '@/interface/types';

interface DataListProps {
  isLoading?: boolean;
  isError?: boolean;
  title: string;
  cols: TABLECOLUMN[];
  data: any[];
  createHref?: string;
  singleHref?: string;
  idColumn?: string;
}

const DataViewer: React.FC<DataListProps> = ({
  isLoading,
  isError,
  title,
  idColumn,
  cols,
  data,
  createHref,
  singleHref
}) => {
  if (isError) return <div>Error</div>;

  return (
    <div className='max-w-6xl'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CrudTable
          idColumn={idColumn}
          title={title}
          cols={cols}
          data={data}
          createHref={createHref}
          singleHref={singleHref}
        />
      )}
    </div>
  );
};

export default DataViewer;
