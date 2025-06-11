import { useEffect } from 'react';

function usePreventCancel<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleCancel = (evt: Event) => evt.preventDefault();

    element.addEventListener('cancel', handleCancel);
    return () => element.removeEventListener('cancel', handleCancel);
  }, [])
}

export default usePreventCancel;