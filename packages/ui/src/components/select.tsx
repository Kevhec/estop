import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ContentProps, OptionProps, RootProps, SelectContextType } from '../types/select'
import { Button } from './button';
import { ButtonProps } from '../types/common';
import { cn } from '../utils/general';
import { useEscape } from './escape-provider';
import useClickOutside from '../hooks/useClickOutside';

enum ControlKeys {
  UP = "ArrowUp",
  DOWN = "ArrowDown"
}

const SelectContext = createContext<SelectContextType>({
  open: false,
  contentId: '',
  selectedIndex: 0,
  optionsCount: { current: 0 },
  onOpenChange: () => null,
  onIndexChange: () => null,
})

function Trigger({ className, children, ...props }: ButtonProps) {
  const { open, contentId, onOpenChange } = useContext(SelectContext);
  const classes = cn('p-2 select-none', className);
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const handleOpen = () => {
    onOpenChange(!open);
  }

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const handleKeyOpen = (evt: KeyboardEvent) => {
      const keyPressed = evt.key;

      if (
        !open &&
        (keyPressed === ControlKeys.UP || keyPressed === ControlKeys.DOWN)
      ) {
        onOpenChange(true)
      }
    }

    trigger.addEventListener('keydown', handleKeyOpen)
    return () => {
      trigger.removeEventListener('keydown', handleKeyOpen)
    }
  }, [])

  useEffect(() => {
    const button = triggerRef.current;
    if (!open && button) button.focus();
  }, [open])

  return (
    <Button
      ref={triggerRef}
      type='button'
      className={classes}
      onClick={handleOpen}
      role='combobox'
      aria-controls={contentId}
      aria-haspopup="listbox"
      tabIndex={0}
      aria-expanded={open}
      {...props}
    >
      {children}
    </Button>
  )
}

function Content({ children }: ContentProps) {
  const { open, contentId, optionsCount, onOpenChange } = useContext(SelectContext);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasInteractedRef = useRef(false);
  const containerClasses = cn(
    "cartoon-container bg-white text-black p-4 mb-2.5",
  )

  useEffect(() => {
    if (Array.isArray(children)) {
      optionsCount.current = children.length
    } else {
      optionsCount.current = 1;
    }
  }, [children])

  useEffect(() => {
    if (open) {
      hasInteractedRef.current = false;
      const timeout = setTimeout(() => {
        hasInteractedRef.current = true;
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  useClickOutside(containerRef, () => {
    if (open && hasInteractedRef.current) {
      onOpenChange(false)
    }
  })

  useEffect(() => {
    if (!containerRef.current || !open) return

    const newContentHeight = containerRef.current.scrollHeight;
    setContentHeight(newContentHeight)
  }, [children, open])

  return (
    <div
      className='overflow-hidden transition-all absolute w-full top-[130%]'
      style={{
        height: open ? `${contentHeight}px` : 0,
      }}
      ref={containerRef}
    >
      <ul
        role='listbox'
        id={contentId}
        className={containerClasses}
      >
        {children}
      </ul>
    </div>
  )
}

function Option({ value, index, children }: OptionProps) {
  const { open, selectedIndex, onIndexChange } = useContext(SelectContext);
  const optionRef = useRef<HTMLLIElement | null>(null);
  const isSelected = selectedIndex === index;

  useEffect(() => {
    if (optionRef.current && isSelected && open) {
      optionRef.current.focus()
    }
  }, [selectedIndex, open])

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return

    const selectOption = () => {
      if (!isSelected) {
        onIndexChange(index)
      }
    }

    option.addEventListener('click', selectOption)

    return () => option.removeEventListener('click', selectOption)
  }, [onIndexChange, selectedIndex])

  return (
    <li
      data-value={value}
      data-focus={isSelected}
      role='option'
      className='data-[focus="true"]:bg-black/20 select-none hover:bg-black/10 transition-colors'
      tabIndex={1}
      ref={optionRef}
    >
      {children}
    </li>
  )
}

enum IndexAction {
  NEXT = 'next',
  PREV = 'prev'
}

export function Select({ children, className }: RootProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<string | number>(0)
  const optionsCount = useRef(0);
  const contentId = useId();
  const containerClasses = cn('relative', className);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, [])

  useEscape(() => {
    let select;
    setOpen(false);
    return true
  }, open)

  const onIndexChange = useCallback((index: number | string) => {
    setSelectedIndex(index);
  }, [])

  const contextValue = useMemo(() => ({
    open,
    contentId,
    selectedIndex,
    optionsCount,
    onOpenChange,
    onIndexChange
  }), [open, contentId, selectedIndex, optionsCount, onOpenChange, onIndexChange])

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={containerClasses}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

Select.Trigger = Trigger;
Select.Content = Content;
Select.Option = Option;