import Link from 'next/link';
import { Icon } from '@/components/atoms/';
import { ICON } from '@/interface/types';
import clsx from 'clsx';

interface ButtonProps {
  text?: string;
  icon?: ICON;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  align?: 'start' | 'center' | 'end';
  type?: 'button' | 'submit' | 'reset' | undefined;
  href?: string;
  isNextLink?: boolean;
  variant: 'primary' | 'secondary' | 'outline' | 'transparent' | 'green' | 'danger' | 'neutro';
  rounded?: boolean;
  size: 'x-small' | 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((event: any) => void);
  className?: string;
  disabled?: boolean;
  target?: string;
  tooltip?: string;
}

const Button = ({
  text,
  icon,
  href,
  iconPosition = 'right',
  fullWidth = false,
  align = 'center',
  type,
  isNextLink,
  variant,
  rounded,
  size,
  onClick,
  className,
  disabled = false,
  target,
  tooltip
}: ButtonProps) => {
  const innerContent = (
    <>
      {text}
      {icon && (
        <Icon
          icon={icon}
          className={`max-w-[14px] ${iconPosition === 'left' ? 'order-first' : 'order-last'}`}
        />
      )}
    </>
  );

  const rootClassName = clsx(
    'cursor-pointer flex items-center font-medium transition-colors gap-3 outline-none',
    {
      'justify-start': align === 'start',
      'justify-center': align === 'center',
      'justify-end': align === 'end',
      'px-2 h-8 text-sm': size === 'x-small',
      'px-5 h-10 text-sm': size === 'small',
      'px-7 h-12 text-md': size === 'medium',
      'px-12 h-16 text-xl': size === 'large',
      'rounded-full': rounded,
      'rounded-lg': !rounded,
      'w-full': fullWidth,
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
      'bg-blue-100/50 text-blue-500 hover:bg-blue-100': variant === 'secondary',
      'bg-transparent text-blue-500 hover:bg-blue-100/50 border-2 border-gray-200': variant === 'outline',
      'bg-transparent text-blue-500 hover:bg-blue-100/50': variant === 'transparent',
      'bg-emerald-400 text-white hover:bg-emerald-500': variant === 'green',
      'bg-red-200 text-slate-600 hover:bg-red-400': variant === 'danger',
      'bg-white text-slate-600 hover:bg-gray-100 border-2 border-gray-200': variant === 'neutro',
      'opacity-50 cursor-auto': disabled,
    },
    className
  );

  return href ? (
    isNextLink ? (
      <Link href={href}>
        <p className={rootClassName}>{innerContent}</p>
      </Link>
    ) : (
      <a target={target} className={rootClassName} href={href}>
        {innerContent}
      </a>
    )
  ) : (
    <button type={type} className={rootClassName} disabled={disabled} onClick={(e) => { if(onClick) onClick(e) }} title={tooltip}>
      {innerContent}
    </button>
  );
};

export default Button;
