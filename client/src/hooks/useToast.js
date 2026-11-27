import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(duration = 3500) {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((nextMessage) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setMessage(nextMessage);
    timerRef.current = setTimeout(() => {
      setMessage(null);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }, []);

  return [message, showToast];
}
