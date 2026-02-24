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

  // Editar matéria
  function handleEditMateria(
    materiaId: string,
    dadosAtualizados: Partial<MateriaModel>,
  ) {
    setMaterias((prev) =>
      prev.map((materia) =>
        materia.id === materiaId
          ? { ...materia, ...dadosAtualizados }
          : materia,
      ),
    );
  }

  // Deletar matéria
  function handleDeleteMateria(materiaId: string) {
    setMaterias((prev) => prev.filter((materia) => materia.id !== materiaId));
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

  // Editar deck
  function handleEditDeck(
    deckId: string,
    dadosAtualizados: Partial<DeckModel>,
  ) {
    setMaterias((prev) =>
      prev.map((materia) => ({
        ...materia,
        decks: materia.decks.map((deck) =>
          deck.id === deckId ? { ...deck, ...dadosAtualizados } : deck,
        ),
      })),
    );
  }

  // Deletar deck
  function handleDeleteDeck(deckId: string) {
    setMaterias((prev) =>
      prev.map((materia) => ({
        ...materia,
        decks: materia.decks.filter((deck) => deck.id !== deckId),
      })),
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

  // Editar card
  function handleEditCard(
    deckId: string,
    cardId: string,
    dadosAtualizados: Partial<CardModel>,
  ) {
    setMaterias((prev) =>
      prev.map((materia) => ({
        ...materia,
        decks: materia.decks.map((deck) => {
          if (deck.id !== deckId) return deck;
          return {
            ...deck,
            cards: deck.cards.map((card) =>
              card.id === cardId ? { ...card, ...dadosAtualizados } : card,
            ),
          };
        }),
      })),
    );
  }

  // Deletar card
  function handleDeleteCard(deckId: string, cardId: string) {
    setMaterias((prev) =>
      prev.map((materia) => ({
        ...materia,
        decks: materia.decks.map((deck) => {
          if (deck.id !== deckId) return deck;
          return {
            ...deck,
            cards: deck.cards.filter((card) => card.id !== cardId),
          };
        }),
      })),
    );
  }

  //Responder Card
  function handleResponderCard(
    deckId: string,
    cardId: string,
    acertou: boolean,
  ) {
    setMaterias((prev) =>
      prev.map((materia) => ({
        ...materia,
        decks: materia.decks.map((deck) => {
          if (deck.id !== deckId) return deck;

          return {
            ...deck,
            cards: deck.cards.map((card) => {
              if (card.id !== cardId) return card;

              const agora = Date.now();

              if (acertou) {
                const novosAcertos = card.acertosConsecutivos + 1;

                return {
                  ...card,
                  acertosConsecutivos: novosAcertos,
                  proximaRevisao: agora + 24 * 60 * 60 * 1000,
                  masterizado: novosAcertos >= 5,
                };
              } else {
                return {
                  ...card,
                  acertosConsecutivos: 0,
                  proximaRevisao: agora + 5 * 60 * 1000,
                };
              }
            }),
          };
        }),
      })),
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
        handleResponderCard,
        handleEditMateria,
        handleDeleteMateria,
        handleEditDeck,
        handleDeleteDeck, 
        handleEditCard, 
        handleDeleteCard, 
      }}
    >
      {children}
    </MateriasContext.Provider>
  );
}
