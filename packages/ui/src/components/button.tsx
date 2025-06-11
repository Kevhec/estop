import { cn } from '../utils/general';
import { ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'button'>

export function Button({ className, children, ...props }: Props) {
  const buttonClasses = cn('cartoon-container cartoon-button rounded-[9999px] bg-primary text-white w-full font-bold text-lg active:translate-y-2.5 active:shadow-none hover:scale-105 transition-all', className)

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}