interface AsideProps {
  children: any;
  className?: string;
}

export const Aside = ({ children, className }: AsideProps) => {
  return (
    <aside
      className={`min-h-full min-w-[300px] rounded-lg border-2 border-gray-200 bg-white xl:max-w-[387px] ${className}`}
    >
      {children}
    </aside>
  );
};
