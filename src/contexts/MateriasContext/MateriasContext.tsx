import { createContext } from "react";
import type { MateriaModel } from "@/models/MateriaModel";
import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";

type MateriasContextProps = {
  materias: MateriaModel[];
  handleAddMateria: (newMateria: MateriaModel) => void;
  handleAddDeck: (materiaId: string, newDeck: DeckModel) => void;
  handleAddCard: (deckId: string, newCard: CardModel) => void;
  handleResponderCard: (
    deckId: string,
    cardId: string,
    acertou: boolean,
  ) => void;
  handleEditMateria: (
    materiaId: string,
    dadosAtualizados: Partial<MateriaModel>,
  ) => void;
  handleDeleteMateria: (materiaId: string) => void;
  handleEditDeck: (
    deckId: string,
    dadosAtualizados: Partial<DeckModel>,
  ) => void;
  handleDeleteDeck: (deckId: string) => void;
  handleEditCard: (
    deckId: string,
    cardId: string,
    dadosAtualizados: Partial<CardModel>,
  ) => void;
  handleDeleteCard: (deckId: string, cardId: string) => void;
};

export const MateriasContext = createContext({} as MateriasContextProps);
