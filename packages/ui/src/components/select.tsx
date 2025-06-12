import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ContentProps, OptionProps, RootProps, SelectContextType, ValueProps } from '../types/select'
import { Button } from './button';
import { ButtonProps } from '../types/common';
import { cn } from '../utils/general';
import { useEscape } from './escape-provider';
import useClickOutside from '../hooks/useClickOutside';

const SelectContext = createContext<SelectContextType>({
  open: false,
  contentId: '',
  selectedValue: null,
  selectedContent: null,
  selectedIndex: 0,
  onIndexChange: () => null,
  onOpenChange: () => null,
  onValueChange: () => null
})

// Available control keys for the select component
enum ControlKeys {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  ENTER = "Enter",
  SPACE = " "
}

function Trigger({ className, children, ...props }: ButtonProps) {
  const { open, contentId, selectedContent, selectedIndex, onOpenChange } = useContext(SelectContext);
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
      tabIndex={0}
      role='combobox'
      aria-controls={contentId}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-activedescendant={`option-${selectedIndex}`}
      {...props}
    >
      {selectedContent || children}
    </Button>
  )
}

function Value({ placeholder }: ValueProps) {
  const { selectedValue } = useContext(SelectContext);
  return (
    selectedValue || placeholder
  )
}

function Content({ children }: ContentProps) {
  const {
    open,
    contentId,
    selectedIndex,
    onIndexChange,
    onOpenChange
  } = useContext(SelectContext);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasInteractedRef = useRef(false);
  const optionsCount = useRef(0);

  const containerClasses = cn(
    "cartoon-container overflow-y-auto max-h-60 bg-white text-black p-4 mb-2.5",
  )

  // Update children count
  useEffect(() => {
    if (!children) return;

    Array.isArray(children)
      ? optionsCount.current = children.length
      : optionsCount.current = 1
  }, [children])

  // Timeout for first interaction, this resolves as a Promise
  // giving time to the component to open avoiding insta closing due to useClickOutside
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

  // Handle keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNavigation = (evt: KeyboardEvent) => {
      const keyPressed = evt.key;
      const lastIndex = optionsCount.current - 1;

      switch (keyPressed) {
        // Navigation with loop, if moving up on first option then last one is selected
        case ControlKeys.UP:
          if (selectedIndex > 0) {
            onIndexChange(selectedIndex - 1)
          } else {
            onIndexChange(lastIndex)
          }
          break
        case ControlKeys.DOWN:
          if (selectedIndex < lastIndex) {
            onIndexChange(selectedIndex + 1)
          } else {
            onIndexChange(0)
          }
          break
      }
    }

    container.addEventListener('keydown', handleNavigation);
    return () => {
      container.removeEventListener('keydown', handleNavigation);
    }
  }, [selectedIndex, onIndexChange])

  // Manually calculate height for dropdown opening animation
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
        tabIndex={-1}
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { index })
            : child
        )}
      </ul>
    </div>
  )
}

function Option({ value, index, children }: OptionProps) {
  const { open, selectedValue, selectedIndex, onIndexChange, onValueChange } = useContext(SelectContext);
  const optionRef = useRef<HTMLLIElement | null>(null);
  const isSelected = selectedValue === value;
  const isFocused = selectedIndex === index;

  const optionClasses = cn('select-none hover:bg-black/10 transition-colors', {
    'bg-black/20': isFocused,
    'bg-black/40': isSelected,
  })

  useEffect(() => {
    const option = optionRef.current;

    if (option && open && (isFocused || isSelected)) {
      option.focus()
      option.scrollIntoView({
        block: 'nearest'
      })
    }
  }, [selectedIndex, open])

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return

    const selectOption = () => {
      onIndexChange(index || 0)
      if (!isSelected) {
        onValueChange(value, children)
      }
    }

    const handleKeyboard = (evt: KeyboardEvent) => {
      evt.preventDefault();
      const keyPressed = evt.key;
      if (keyPressed === ControlKeys.ENTER || keyPressed === ControlKeys.SPACE) {
        selectOption();
      }
    }

    option.addEventListener('click', selectOption);
    option.addEventListener('keydown', handleKeyboard);
    return () => {
      option.removeEventListener('click', selectOption);
      option.removeEventListener('keydown', handleKeyboard);
    }
  }, [selectedValue, onValueChange])

  return (
    <li
      ref={optionRef}
      id={`option-${index}`}
      data-value={value}
      data-focus={isFocused}
      className={optionClasses}
      tabIndex={-1}
      role='option'
      aria-selected={isSelected}
    >
      {children}
    </li>
  )
}

export function Select({ name, className, children }: RootProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<React.ReactNode | null>(null);
  const [shouldAnnounce, setShouldAnnounce] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contentId = useId();
  const containerClasses = cn('relative', className);

  const onIndexChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, [])

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, [])

  const onValueChange = useCallback((value: string, content: React.ReactNode) => {
    setSelectedValue(value);
    setSelectedContent(content);
    onOpenChange(false);
  }, [])

  useEffect(() => {
    setShouldAnnounce(true);

    const timeoutId = setTimeout(() => {
      setShouldAnnounce(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [selectedValue])

  useEscape(() => {
    onOpenChange(false);
    return true
  }, open)

  const contextValue = useMemo(() => ({
    open,
    contentId,
    selectedValue,
    selectedContent,
    selectedIndex,
    onIndexChange,
    onOpenChange,
    onValueChange
  }), [
    open,
    contentId,
    selectedValue,
    selectedContent,
    selectedIndex,
    onIndexChange,
    onOpenChange,
    onValueChange
  ])

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={containerClasses}>
        {children}
        {name && (
          <input type="hidden" name={name} value={selectedValue || ''} />
        )}
        <div
          id="announcement"
          className='sr-only'
          aria-live={shouldAnnounce ? "assertive" : "off"}
          role="alert"
        >{selectedValue}</div>
      </div>
    </SelectContext.Provider>
  )
}

Select.Trigger = Trigger;
Select.Value = Value;
Select.Content = Content;
Select.Option = Option;