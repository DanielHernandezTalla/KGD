import Image from "next/image";
import LogoCEFIS from "./../../../images/logotipo.jpg";

interface LogoProps {
    heigth: number;
    width: number;
}

export const Logo = ({ width, heigth }: LogoProps) => {
    return (
        <Image
            src={LogoCEFIS}
            alt="Logo"
            width={width || 156}
            height={heigth || 79}
            priority={width !== 104} //Esta linea esta por que marcaba un warning
            className="w-auto h-auto"
        />
        // <h1>Hola</h1>
    );
};
