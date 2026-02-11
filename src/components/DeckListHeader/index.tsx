type DeckListHeaderProps = {
  onAddDeck: () => void;
};

export function DeckListHeader({ onAddDeck }: DeckListHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between bg-bg-flashcard py-2 w-full">
        <h2 className="text-2xl font-bold text-black-flashcard mx-36">
          MEUS DECKS
        </h2>
        <button
          className="btnAddNewDeck mx-36 bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer"
          onClick={onAddDeck}
        >
          Adicionar novo deck
        </button>
      </div>
    </div>
  );
}
