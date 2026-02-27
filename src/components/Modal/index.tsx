import { useEffect, useRef, useState } from "react";
import type { ReactNode, TouchEvent } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

type ModalContentProps = {
  onClose: () => void;
  children: ReactNode;
};

function ModalContent({ children, onClose }: ModalContentProps) {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleTouchStart(e: TouchEvent) {
    setTouchStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e: TouchEvent) {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    const scrollTop = contentRef.current?.scrollTop ?? 0;
    if (scrollTop <= 0 && diff > 10) {
      setDragY(diff);
    }
  }

  function handleTouchEnd() {
    if (dragY > 150) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
    setTouchStartY(null);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchEnd={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      />

      <div
        onTouchStart={(e) => {
          e.stopPropagation();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragY}px)`,
          transition:
            dragY === 0
              ? "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)"
              : "none",
        }}
        className="
          relative w-full bg-white
          rounded-t-[32px] sm:rounded-2xl
          flex flex-col
          max-h-[94vh] sm:max-h-[85vh]
          sm:max-w-md
          shadow-2xl
          z-[101]
        "
      >
        <div className="flex justify-center py-4 sm:hidden shrink-0">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 pb-12 pt-2 sm:pt-6"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 👇 quando isOpen vira false, ModalContent é desmontado
  // e todos os estados (dragY, touchStartY) são resetados automaticamente
  if (!isOpen) return null;

  return <ModalContent onClose={onClose}>{children}</ModalContent>;
}
