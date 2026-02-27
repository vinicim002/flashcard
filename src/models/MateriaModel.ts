import type { DeckModel } from "./DeckModel";

export type MateriaModel = {
  id: string;
  nome: string;
  decks: DeckModel[];
  totalDecksConcluidos: number;
  cor: string;
  icone: string;
}