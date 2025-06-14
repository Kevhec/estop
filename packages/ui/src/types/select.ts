import React, { PropsWithChildren } from 'react';

export interface SelectContextType {
  open: boolean;
  contentId: string;
  selectedValue: string | null;
  selectedContent: React.ReactNode | null;
  selectedIndex: number;
  handleIndex: (index: number) => void;
  handleOpen: (open: boolean) => void;
  handleValue: (value: string, content: React.ReactNode) => void;
}

export interface RootProps extends PropsWithChildren {
  className?: string
  name?: string
  defaultValue?: string | null
  onValueChange?: (value: string) => void;
}

export type ContentProps = PropsWithChildren

export interface OptionProps extends PropsWithChildren {
  value: string
  index?: number
}

export interface ValueProps {
  placeholder?: string
}