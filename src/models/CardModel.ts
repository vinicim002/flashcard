export type CardModel = {
  id: string;
  frente: string;
  verso: string;
  dica: string;

  acertosConsecutivos: number;
  proximaRevisao: number; // timestamp
  masterizado: boolean;
};
