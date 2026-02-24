type DeckListHeaderProps = {
  onAddDeck: () => void;
};

export function DeckListHeader({ onAddDeck }: DeckListHeaderProps) {
  return (
    <header className="w-full bg-bg-flashcard py-4 px-4 md:px-8 lg:px-36">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-black-flashcard text-center sm:text-left">
          MEUS DECKS
        </h2>

        <button
          className="btnAddNewDeck bg-white-flashcard text-black-flashcard px-6 py-2 rounded-2xl border-2 border-primary-flashcard cursor-pointer transition-transform active:scale-95 hover:bg-primary-flashcard/10"
          onClick={onAddDeck}
        >
          + Adicionar novo deck
        </button>
      </div>
    </header>
  );
}
