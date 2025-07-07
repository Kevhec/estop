import { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/general';

type Props = ComponentPropsWithRef<'button'>;

export default function Button({ className, children, ...props }: Props) {
  const buttonClasses = cn('cartoon-container cartoon-button rounded-[9999px] bg-primary text-white w-full font-bold text-lg active:translate-y-2.5 active:shadow-none hover:scale-105 transition-all', className);

  return (
    // eslint-disable-next-line react/button-has-type, react/jsx-props-no-spreading
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
