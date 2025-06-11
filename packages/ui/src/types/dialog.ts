import React, { PropsWithChildren } from 'react'

export interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface RootProps {
  children: React.ReactNode
}

export type ContentProps = React.DialogHTMLAttributes<HTMLDialogElement>

export interface TitleProps {
  children: React.ReactNode
}