'use client';
import './Tag.css';

export interface TagProps {
  text: string;
  className?: string;
  bgColor?: string;
}

export default function Tag({ text, className, bgColor = 'bg-gray-200' }: TagProps) {

  return (
    <div className={`px-2 py-0.5 rounded-md text-xs font-bold select-none tag ${bgColor} ${className}`}>
      {text}
    </div>
  );
}
