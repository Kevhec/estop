import { cva } from 'class-variance-authority';
import { cn } from '../utils/general';
import { TypographyElementProps } from '../types/typography';

export const typographyVariants = cva(
  '',
  {
    variants: {
      variant: {
        p: 'text-base',
        h1: 'text-2xl md:text-4xl font-bold',
        h2: 'text-lg font-semibold',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        span: '',
      },
    },
  },
);

export function Typography <T extends React.ElementType = 'p'>({
  variant = 'p', className, children, ...restProps
}: TypographyElementProps<T>) {
  const Component = variant as React.ElementType;
  const classes = cn(typographyVariants({ variant, className }));

  return (
    <Component className={classes} {...restProps}>
      {children}
    </Component>
  );
}