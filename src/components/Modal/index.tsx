type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Overlay - Captura o clique para fechar */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container do Modal */}
      <div
        className="
          relative w-full bg-white shadow-2xl
          rounded-t-[24px] flex flex-col
          max-h-[92vh] sm:max-h-[90vh]
          sm:max-w-md sm:rounded-2xl
          animate-in slide-in-from-bottom-4 duration-300
        "
        role="dialog"
        aria-modal="true"
      >
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        {/* Indicador visual para mobile */}
        <div className="flex justify-center py-3 sm:hidden shrink-0">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Área de conteúdo rolável */}
        <div className="overflow-y-auto no-scrollbar px-6 pb-8 pt-2 sm:pt-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
