type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container */}
      <div
        className="
          relative w-full bg-white shadow-2xl
          rounded-t-[24px] max-h-[92vh] flex flex-col
          sm:max-w-md sm:rounded-2xl sm:max-h-[min(90vh,700px)]
        "
        role="dialog"
        aria-modal="true"
      >
        {/* CSS para esconder scrollbar */}
        <style>
          {`
            .no-scrollbar {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }

            .no-scrollbar::-webkit-scrollbar {
              width: 0px;
              height: 0px;
            }
          `}
        </style>

        {/* Barra visual mobile */}
        <div className="flex justify-center py-3 sm:hidden">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Conteúdo com scroll invisível */}
        <div className="overflow-y-auto no-scrollbar px-6 pb-8 pt-2 sm:pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
