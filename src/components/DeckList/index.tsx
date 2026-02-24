import type { DeckModel } from "@/models/DeckModel";
import { DeckCard } from "../DeckCard";

type DeckListProps = {
  decks: DeckModel[];
  materiaId: string;
};

export function DeckList({ decks, materiaId }: DeckListProps) {
  return (
    <ul>
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          id={deck.id}
          materiaId={materiaId}
          nomeDeck={deck.nome}
          totalCards={deck.cards.length}
          cardsConcluidos={deck.cards.filter((card) => card.masterizado).length} // 👈
        />
      ))}
    </ul>
  );
}
