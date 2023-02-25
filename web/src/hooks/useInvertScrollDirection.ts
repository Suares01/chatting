import { useCallback, useEffect, useRef } from "react";

export function useInvertScrollDirection(enabled: boolean) {
  const ref = useRef<HTMLDivElement>();

  const invertedWheelEvent = useCallback((e: WheelEvent) => {
    if (ref.current) {
      ref.current.scrollTop += -e.deltaY;
      e.preventDefault();
    }
  }, []);

  useEffect(
    () => () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", invertedWheelEvent);
      }
    },
    []
  );

  return function (incomingRef: HTMLDivElement | null) {
    if (!enabled || !incomingRef) {
      return;
    }

    ref.current = incomingRef;

    if (ref.current) {
      ref.current.addEventListener("wheel", invertedWheelEvent);
    }
  };
}
