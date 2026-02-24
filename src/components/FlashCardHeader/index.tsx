import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router";

type FlashCardHeaderProps = {
  onAddCard: () => void;
};

export function FlashCardHeader({ onAddCard }: FlashCardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="pt-6 md:pt-10 px-4 md:px-8 lg:px-36">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Botão Home - Reduzi o ícone no mobile para não ocupar muito espaço vertical */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btnHome bg-primary-flashcard rounded-full p-2 md:p-3 border-secondary-flashcard cursor-pointer transition-transform active:scale-90 hover:opacity-90"
          aria-label="Voltar para Home"
        >
          <HomeIcon
            size={24}
            className="text-secondary-flashcard md:w-8 md:h-8"
          />
        </button>

        {/* Botão Adicionar Card - Segue o padrão dos outros botões que criamos */}
        <button
          onClick={onAddCard}
          className="
            btnAddNewDeck bg-white-flashcard text-black-flashcard 
            px-4 py-2 md:px-6 md:py-2.5 rounded-2xl border-2 
            border-primary-flashcard cursor-pointer font-bold
            transition-all active:scale-95 hover:bg-primary-flashcard/10
          "
        >
          <span className="hidden sm:inline">Adicionar Novo Card</span>
          <span className="sm:hidden">+ Card</span>
        </button>
      </nav>
    </header>
  );
}
