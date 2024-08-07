// import clsx from 'clsx';
import { Icon } from '@/components/atoms/';

// uepa
// QUE FALTA le e movido apura iterfaz
// puse los bugs en el disc ahorita los wa checar
interface StatusProps {
  text: string;
  status: boolean;
  onClick?: () => void;
}

export const Status = ({ text, status, onClick }: StatusProps) => {
  // const rootClassName = clsx({
  //   'bg-green-500': status,
  //   'bg-red-500': !status
  // });
  return (
    // <div className={rootClassName}>

    <div
      className={`border-emeral-300 flex items-center gap-3 rounded-xl border-2 p-2.5 ${
        status ? 'border-emeral-300 bg-emerald-100' : 'border-slate-300 bg-slate-100'
      }`}
      onClick={onClick}
    >
      <div>
        <Icon
          icon={status ? 'circleCheck' : 'powerOff'}
          className={`text-lg ${status ? 'text-emerald-500' : 'text-slate-500'}`}
        />
      </div>
      <p className='truncate font-semibold text-slate-600' title={text}>
        {text}
      </p>
    </div>
  );
};
