import { MateriasContext } from "./MateriasContext";
import type { MateriaModel } from "@/models/MateriaModel";
import type { DeckModel } from "@/models/DeckModel";
import { useEffect, useState } from "react";
import type { CardModel } from "@/models/CardModel";

type MateriasContextProviderProps = {
  children: React.ReactNode;
};

export function MateriasContextProvider({
  children,
}: MateriasContextProviderProps) {
  // Estado das matérias
  const [materias, setMaterias] = useState<MateriaModel[]>(() => {
    try {
      const materiasSalvas = localStorage.getItem("materias");
      return materiasSalvas ? JSON.parse(materiasSalvas) : [];
    } catch {
      return [];
    }
  });

  // Adicionar matéria
  function handleAddMateria(newMateria: MateriaModel) {
    setMaterias((prev) => [...prev, newMateria]);
  }

  // Adicionar deck dentro da matéria correta
  function handleAddDeck(materiaId: string, newDeck: DeckModel) {
    setMaterias((prev) =>
      prev.map((materia) =>
        materia.id === materiaId
          ? { ...materia, decks: [...materia.decks, newDeck] }
          : materia,
      ),
    );
  }

  //Adicionar card dentro do deck correto
  function handleAddCard(deckId: string, newCard: CardModel) {
    setMaterias((prev) =>
      prev.map((materia) => {
        const deckExiste = materia.decks.some((deck) => deck.id === deckId);

        if (!deckExiste) return materia;

        return {
          ...materia,
          decks: materia.decks.map((deck) =>
            deck.id === deckId
              ? { ...deck, cards: [...deck.cards, newCard] }
              : deck,
          ),
        };
      }),
    );
  }

  // Persistência
  useEffect(() => {
    localStorage.setItem("materias", JSON.stringify(materias));
  }, [materias]);

  return (
    <MateriasContext.Provider
      value={{
        materias,
        handleAddMateria,
        handleAddDeck,
        handleAddCard,
      }}
    >
      {children}
    </MateriasContext.Provider>
  );
}
