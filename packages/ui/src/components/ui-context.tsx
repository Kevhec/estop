import { PropsWithChildren } from 'react';
import { EscapeProvider } from './escape-provider';

export function UiContext({ children }: PropsWithChildren) {
  return (
    <EscapeProvider>
      {children}
    </EscapeProvider>
  )
}