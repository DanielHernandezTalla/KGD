interface AsideProps {
  children: any;
  className?: string;
}

export const Aside = ({ children, className }: AsideProps) => {
  return (
    <aside
      className={`min-h-full min-w-[387px] rounded-3xl border-2 border-slate-200 bg-white xl:max-w-[387px] ${className}`}
    >
      {children}
    </aside>
  );
};
