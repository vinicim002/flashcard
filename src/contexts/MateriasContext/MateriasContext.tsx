import { createContext } from "react";
import type { MateriaModel } from "@/models/MateriaModel";
import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";

type MateriasContextProps = {
  materias: MateriaModel[];
  handleAddMateria: (newMateria: MateriaModel) => void;
  handleAddDeck: (materiaId: string, newDeck: DeckModel) => void;
  handleAddCard: (deckId: string, newCard: CardModel) => void;
};

export const MateriasContext = createContext({} as MateriasContextProps);
