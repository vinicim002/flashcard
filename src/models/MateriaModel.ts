import type { DeckModel } from "./DeckModel";

export type MateriaModel = {
  id: string;
  nome: string;
  deck: DeckModel[];
  totalDecksConcluidos: number;
  imagemUrl?: string;
  cor: string
};
