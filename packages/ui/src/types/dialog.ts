import React from 'react';

export interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface RootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ContentProps = React.DialogHTMLAttributes<HTMLDialogElement>;

export interface TitleProps {
  children: React.ReactNode
}
