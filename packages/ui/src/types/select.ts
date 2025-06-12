import React, { PropsWithChildren, RefObject } from 'react';

export interface SelectContextType {
  open: boolean;
  contentId: string;
  selectedValue: string | null;
  selectedContent: React.ReactNode | null;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string, content: React.ReactNode) => void;
}

export interface RootProps extends PropsWithChildren {
  className?: string
}

export type ContentProps = PropsWithChildren

export interface OptionProps extends PropsWithChildren {
  value: string
  index?: number
}

export interface ValueProps {
  placeholder?: string
}