import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const snapshot = () => window.matchMedia?.(query).matches ?? false;
const serverSnapshot = () => false;
function subscribe(callback) {
  const media = window.matchMedia?.(query);
  if (!media) return () => {};
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
