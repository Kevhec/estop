import { useEffect, useRef, useState } from 'react';

function useInteractionDelay(active: boolean, delay: number) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (active) {
      setHasInteracted(false)
      const timeout = setTimeout(() => {
        setHasInteracted(true)
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [active]);

  return {
    hasInteracted: hasInteracted
  }
}

export default useInteractionDelay;
