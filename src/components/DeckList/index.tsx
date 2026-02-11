import type { DeckModel } from "@/models/DeckModel";
import { DeckCard } from "../DeckCard";

type DeckListProps = {
  decks: DeckModel[];
};

export function DeckList({ decks }: DeckListProps) {
  return (
    <ul>
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          nomeDeck={deck.nome}
          totalCards={deck.cards.length}
          cardsConcluidos={deck.cards.filter((card) => card.concluido).length}
        />
      ))}
    </ul>
  );
}
