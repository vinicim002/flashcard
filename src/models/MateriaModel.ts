import type { DeckModel } from "./DeckModel";

export type MateriaModel = {
  id: string;
  nome: string;
  decks: DeckModel[];
  totalDecksConcluidos: number;
  imagemUrl?: string;
  cor: string
};
