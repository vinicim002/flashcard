import { useState } from "react";

export function useModal() {
  // Modal logic to be implemented
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
