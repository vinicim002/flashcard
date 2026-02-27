import { useState, TouchEvent, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!isOpen) return null;

  // Lógica de Swipe to Close (Deslizar para baixo)
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;
    const scrollContainer = e.currentTarget.querySelector(".modal-content");

    // Só fecha se o usuário estiver no topo do scroll e deslizar para baixo
    if (diff > 150 && scrollContainer && scrollContainer.scrollTop <= 0) {
      onClose();
      setTouchStart(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay com desfoque */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Container do Modal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="
          relative w-full bg-white shadow-2xl
          rounded-t-[32px] sm:rounded-2xl
          flex flex-col
          max-h-[94vh] sm:max-h-[85vh]
          sm:max-w-md z-[101]
          animate-in slide-in-from-bottom-10 duration-300
          outline-none
        "
      >
        {/* Barra de arraste visual */}
        <div className="flex justify-center py-4 sm:hidden shrink-0">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Área de Conteúdo - Onde o scroll acontece livremente */}
        <div
          className="modal-content flex-1 overflow-y-auto px-6 pb-12 pt-2 sm:pt-6 no-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
