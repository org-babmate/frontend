'use client';

import { useEffect, useRef, useState } from 'react';

type SSEState = 'idle' | 'connecting' | 'open' | 'closed' | 'error';

type UseEventSourceOptions<T> = {
  url: string;
  enabled: boolean;
  withCredentials?: boolean;
  resetKey?: number;
  onMessage?: (data: T) => void;
  onOpen?: () => void;
  onError?: (e: Event) => void;
};

export function useEventSource<T = unknown>({
  url,
  enabled,
  withCredentials = true,
  resetKey = 0,
  onMessage,
  onOpen,
  onError,
}: UseEventSourceOptions<T>) {
  const esRef = useRef<EventSource | null>(null);
  const [state, setState] = useState<SSEState>('idle');

  useEffect(() => {
    if (!enabled) {
      esRef.current?.close();
      esRef.current = null;
      setState('idle');
      return;
    }

    esRef.current?.close();

    setState('connecting');
    const es = new EventSource(url, { withCredentials });
    esRef.current = es;

    es.onopen = () => {
      setState('open');
      onOpen?.();
    };

    es.onmessage = (evt) => {
      try {
        onMessage?.(JSON.parse(evt.data) as T);
      } catch {
        onMessage?.(evt.data as unknown as T);
      }
    };

    es.onerror = (e) => {
      setState('error');
      onError?.(e);
    };

    return () => {
      es.close();
      if (esRef.current === es) esRef.current = null;
      setState('closed');
    };
  }, [enabled, url, withCredentials, onMessage, onOpen, onError, resetKey]);

  const close = () => {
    esRef.current?.close();
    esRef.current = null;
    setState('closed');
  };

  return { state, close };
}
