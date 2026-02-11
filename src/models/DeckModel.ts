import type { CardModel } from "./CardModel";

export type DeckModel = {
  id: string;
  nome: string;
  cards: CardModel[];
}