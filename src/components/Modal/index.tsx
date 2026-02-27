import { useState, useEffect, useRef } from "react";
import type { TouchEvent, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 🔒 Bloqueia scroll do body quando modal abre
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ==========================
  // TOUCH HANDLERS (Mobile)
  // ==========================

  function handleTouchStart(e: TouchEvent) {
    setTouchStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e: TouchEvent) {
    if (touchStartY === null) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;

    const scrollTop = contentRef.current?.scrollTop ?? 0;

    // Só permite arrastar se estiver no topo do scroll
    if (scrollTop <= 0 && diff > 0) {
      setDragY(diff);
    }
  }

  function handleTouchEnd() {
    if (dragY > 120) {
      onClose();
    } else {
      setDragY(0);
    }

    setTouchStartY(null);
  }

  // ==========================
  // RENDER
  // ==========================

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? "transform 0.2s ease" : "none",
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
        {/* Barra de arraste (mobile) */}
        <div className="flex justify-center py-4 sm:hidden shrink-0">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Conteúdo scrollável */}
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
