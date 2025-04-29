import Image from 'next/image';
import LogoCEFIS from './../../../images/logotipo.jpg';

interface LogoProps {
  heigth: number;
  width: number;
}

export const Logo = ({ width, heigth }: LogoProps) => {
  return (
    <div className='relative w-[156px] aspect-[156/79]'>
      <Image
        src={LogoCEFIS}
        alt='Logo'
        fill
        priority
        style={{ objectFit: 'contain' }}
        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 156px'
      />
    </div>
    // <h1>Hola</h1>
  );
};
