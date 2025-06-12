import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ContentProps, DialogContextType, RootProps } from '../types/dialog';
import { cn } from '../utils/general';
import { Button } from './button';
import { TypographyElementProps } from '../types/typography';
import { Typography } from './typography';
import { Portal } from './portal';
import { ButtonProps } from '../types/common';
import { useEscape } from './escape-provider';
import useClickOutside from '../hooks/useClickOutside';
import { AnimatePresence, motion } from "motion/react"
import usePreventCancel from '../hooks/usePreventCancel';

const MotionDialog = motion.create('dialog');

const DialogContext = createContext<DialogContextType>({
  open: false,
  onOpenChange: () => null,
});

function Trigger({ className, children, ...props }: ButtonProps) {
  const { open, onOpenChange } = useContext(DialogContext);
  const classes = cn('p-2', className)

  return (
    <Button
      type='button'
      className={classes}
      onClick={() => onOpenChange(!open)}
      {...props}
    >
      {children}
    </Button>
  )
}

function Title({ variant = 'h2', ...props }: TypographyElementProps<'h2'>) {
  return (
    <Typography variant={variant} {...props} />
  )
}

function Content({ className, children, ...props }: ContentProps) {
  const { open, onOpenChange } = useContext(DialogContext);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogContainerRef = useRef<HTMLDivElement | null>(null);
  const hasInteractedRef = useRef(false);
  usePreventCancel(dialogRef)

  const dialogClasses = cn('bg-transparent text-white backdrop:bg-black/60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 overflow-visible')
  const containerClasses = cn('cartoon-container bg-primary text-white backdrop:bg-black/60 h-full', className)

  useEffect(() => {
    if (open) {
      hasInteractedRef.current = false;
      const timeout = setTimeout(() => {
        hasInteractedRef.current = true;
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  useClickOutside(dialogContainerRef, () => {
    if (open && hasInteractedRef.current) {
      onOpenChange(false)
    }
  })

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!dialogElement) return;

    if (open) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [open])

  return (
    <motion.dialog
      ref={dialogRef}
      className={dialogClasses}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: .2 }}
      animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0
      }}
      onClose={(e) => e.preventDefault()}
      /* {...props} */
    >
      <div ref={dialogContainerRef} className={containerClasses}>
        {children}
      </div>
    </motion.dialog>
  )
}

export function Dialog({ children }: RootProps) {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((open: boolean) => {
    console.log({ open })
    setOpen(open)
  }, [])

  const contextValue = useMemo(() => ({
    open,
    onOpenChange,
  }), [open, onOpenChange])

  useEscape(() => {
    let dialog;
    setOpen(false);
    return true
  }, open)

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  )
}

// Set child components as properties of root
Dialog.Trigger = Trigger;
Dialog.Portal = Portal;
Dialog.Content = Content;
Dialog.Title = Title;