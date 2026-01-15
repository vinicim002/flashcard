import { DeckCard } from "../DeckCard";

type Deck = {
  id: string;
  nome: string;
  totalCards: number;
  cardsConcluidos: number;
};

type DeckListProps = {
  decks: Deck[];
  // onPlayDeck: (id: string) => void;
};

export function DeckList({ decks }: DeckListProps) {
  return (
    <ul>
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          nomeDeck={deck.nome}
          totalCards={deck.totalCards}
          cardsConcluidos={deck.cardsConcluidos}
          // onPlay={() => onPlayDeck(deck.id)}
        />
      ))}
    </ul>
  );
}
