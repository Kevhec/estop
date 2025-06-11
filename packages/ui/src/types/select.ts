import { PropsWithChildren, RefObject } from 'react';

export interface SelectContextType {
  open: boolean
  contentId: string
  selectedIndex: string | number
  optionsCount: RefObject<number>
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: string | number) => void
}

export interface RootProps extends PropsWithChildren {
  className?: string
}

export type ContentProps = PropsWithChildren

export interface OptionProps extends PropsWithChildren {
  value: string | number
  index: string | number
}