import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("../../atoms/Date"), { ssr: false });

interface TitlePageProps {
    title: string;
    className?: string;
}

export const TitlePage = ({ title }: TitlePageProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium capitalize text-slate-800 md:text-4xl">
                {title}
            </h1>
            <NoSSR />
        </div>
    );
};
