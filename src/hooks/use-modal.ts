import { useState } from "react";

export function useModal<T>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  function open(modalData?: T) {
    setData(modalData ?? null);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setData(null);
  }

  return { isOpen, open, close, data };
}
