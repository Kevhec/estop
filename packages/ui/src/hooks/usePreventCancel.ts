import { useEffect } from 'react';

function usePreventCancel<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // Don't stopPropagation here so inner components (like Select) can still listen
      }
    };

    element.addEventListener('cancel', handleCancel);
    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('cancel', handleCancel);
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

export default usePreventCancel;