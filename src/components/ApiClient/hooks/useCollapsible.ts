import { useState } from 'react';

export function useCollapsible(defaultOpen = true) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return {
    isOpen,
    toggle: () => setIsOpen(prev => !prev),
  };
}