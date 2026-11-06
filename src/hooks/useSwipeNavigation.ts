import { useEffect, useRef } from 'react';

interface SwipeStart {
  pointerId: number;
  x: number;
  y: number;
}

export const useSwipeNavigation = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) => {
  const start = useRef<SwipeStart | null>(null);
  const suppressClick = useRef(false);
  const resetClickTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetClickTimer.current !== null) window.clearTimeout(resetClickTimer.current);
  }, []);

  return {
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'touch' || !event.isPrimary) return;
      start.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    },
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => {
      const initial = start.current;
      start.current = null;
      if (!initial || initial.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - initial.x;
      const deltaY = event.clientY - initial.y;
      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

      event.preventDefault();
      suppressClick.current = true;
      if (resetClickTimer.current !== null) window.clearTimeout(resetClickTimer.current);
      resetClickTimer.current = window.setTimeout(() => {
        suppressClick.current = false;
        resetClickTimer.current = null;
      }, 180);

      if (deltaX < 0) onSwipeLeft();
      else onSwipeRight();
    },
    onPointerCancel: () => {
      start.current = null;
    },
    onClickCapture: (event: React.MouseEvent<HTMLDivElement>) => {
      if (!suppressClick.current) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick.current = false;
      if (resetClickTimer.current !== null) {
        window.clearTimeout(resetClickTimer.current);
        resetClickTimer.current = null;
      }
    },
  };
};
