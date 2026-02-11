import { createContext } from "react";
import type { MateriaModel } from "@/models/MateriaModel";
import type { DeckModel } from "@/models/DeckModel";

type MateriasContextProps = {
  materias: MateriaModel[];
  handleAddMateria: (newMateria: MateriaModel) => void;
  handleAddDeck: (materiaId: string, newDeck: DeckModel) => void;
};

export const MateriasContext = createContext(
  {} as MateriasContextProps
);
