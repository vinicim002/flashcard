type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay: Garantindo que o clique fora funcione sempre */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
        style={{ touchAction: "none" }} // Impede scroll no fundo
      />

      {/* Container do Modal */}
      <div
        className="
          relative w-full bg-white shadow-2xl
          rounded-t-[24px] sm:rounded-2xl
          flex flex-col
          h-auto max-h-[90vh] 
          sm:max-w-md
          z-[101] pointer-events-auto
          animate-in slide-in-from-bottom-full duration-300
        "
        style={{ touchAction: "pan-y" }} // Permite scroll vertical interno no toque
      >
        {/* Barra de arraste para Mobile */}
        <div className="flex justify-center py-4 sm:hidden shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* ÁREA DE CONTEÚDO: O segredo está no -webkit-overflow-scrolling */}
        <div
          className="flex-1 overflow-y-auto px-6 pb-10 pt-2 sm:pt-6"
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
