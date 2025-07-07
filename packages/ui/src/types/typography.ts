import type { VariantProps } from 'class-variance-authority';
import { typographyVariants } from '../components/typography';

export type TypographyVariants = VariantProps<typeof typographyVariants>['variant'];

export type TypographyProps = {
  variant?: TypographyVariants;
};

export type TypographyElementProps <T extends React.ElementType> =
  React.PropsWithChildren<TypographyProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps>;
