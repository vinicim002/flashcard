import type { CardModel } from "@/models/CardModel";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type AddCardFormProps = {
  onSubmitCard: (card: CardModel) => void;
  onClose: () => void;
};

export function AddCardForm({ onSubmitCard, onClose }: AddCardFormProps) {
  const [frenteCard, setFrenteCard] = useState("");
  const [versoCard, setVersoCard] = useState("");
  const [dicaCard, setDicaCard] = useState("");

  function handleSubmitCard(e: React.FormEvent) {
    e.preventDefault();
    const newCard: CardModel = {
      id: uuidv4(),
      frente: frenteCard,
      verso: versoCard,
      dica: dicaCard,
      acertosConsecutivos: 0,
      proximaRevisao: 0,
      masterizado: false,
    };
    onSubmitCard(newCard);
    onClose();
    setDicaCard("");
    setFrenteCard("");
    setVersoCard("");
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Adicionar Card</h2>
        <p className="text-sm text-gray-500">Crie um novo flashcard para este deck</p>
      </div>

      {/* Preview */}
      <div className="w-full h-16 rounded-xl mb-4 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 px-4">
        <span className="text-gray-700 font-bold text-sm text-center truncate w-full text-center">
          {frenteCard || "Frente do card"}
        </span>
        {versoCard && (
          <span className="text-gray-400 text-xs text-center truncate w-full text-center mt-1">
            {versoCard}
          </span>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSubmitCard}>
        <div className="flex flex-col gap-1">
          <label htmlFor="frenteCard" className="text-sm font-medium text-gray-700">
            Frente do card (Pergunta)
          </label>
          <textarea
            id="frenteCard"
            placeholder="Ex: O que é useEffect?"
            rows={3}
            className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={frenteCard}
            onChange={(e) => setFrenteCard(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="versoCard" className="text-sm font-medium text-gray-700">
            Verso do card (Resposta)
          </label>
          <textarea
            id="versoCard"
            placeholder="Hook usado para efeitos colaterais..."
            rows={3}
            className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={versoCard}
            onChange={(e) => setVersoCard(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dicaCard" className="text-sm font-medium text-gray-700">
            Dica (opcional)
          </label>
          <input
            id="dicaCard"
            type="text"
            placeholder="Ex: Hook de ciclo de vida"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={dicaCard}
            onChange={(e) => setDicaCard(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Salvar Card
          </button>
        </div>
      </form>
    </>
  );
}