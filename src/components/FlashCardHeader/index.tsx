import { HomeIcon } from "lucide-react";

type FlashCardHeaderProps = {
  onAddCard: () => void;
}

export function FlashCardHeader({onAddCard}: FlashCardHeaderProps) {
  
  return (
    <>
      <header className="pt-10">
        <nav className="flex items-center justify-between">
          <button
            type="button"
            className="btnHome bg-primary-flashcard rounded-full p-2 border-secondary-flashcard cursor-pointer"
          >
            <HomeIcon size={32} className="text-secondary-flashcard" />
          </button>

          <button className="btnAddNewDeck bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer"
          onClick={onAddCard}
          >
            Adicionar Card
          </button>
        </nav>
      </header>
    </>
  );
}
