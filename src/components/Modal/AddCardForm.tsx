import type { CardModel } from "@/models/CardModel";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type AddCardFormProps = {
  onSubmitCard: (card: CardModel) => void;
};

export function AddCardForm({ onSubmitCard }: AddCardFormProps) {
  const [frenteCard, setFrenteCard] = useState("");
  const [versoCard, setVersoCard] = useState("");
  const [dicaCard, setDicaCard] = useState("");

  function handleFrenteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFrenteCard(e.target.value);
  }

  function handleVersoChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setVersoCard(e.target.value);
  }

  function handleDicaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDicaCard(e.target.value);
  }

  function handleSubmitCard(e: React.FormEvent) {
    e.preventDefault();

    const newCard = {
      id: uuidv4(),
      frente: frenteCard,
      verso: versoCard,
      dica: dicaCard,
      concluido: false,
    };

    onSubmitCard(newCard);

    setDicaCard("");
    setFrenteCard("");
    setVersoCard("");
    console.log(newCard);
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Adicionar Card</h2>
        <p className="text-sm text-gray-500">
          Crie um novo flashcard para este deck
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmitCard}>
        {/* Frente do Card */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="frenteCard"
            className="text-sm font-medium text-gray-700"
          >
            Frente do card (Pergunta)
          </label>

          <textarea
            id="frenteCard"
            placeholder="Ex: O que é useEffect?"
            rows={4}
            className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={frenteCard}
            onChange={handleFrenteChange}
          />
        </div>

        {/* Verso do Card */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="versoCard"
            className="text-sm font-medium text-gray-700"
          >
            Verso do card (Resposta)
          </label>

          <textarea
            id="versoCard"
            placeholder="Hook usado para efeitos colaterais..."
            rows={4}
            className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={versoCard}
            onChange={handleVersoChange}
          />
        </div>

        {/* Dica opcional */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dicaCard"
            className="text-sm font-medium text-gray-700"
          >
            Dica (opcional)
          </label>

          <input
            id="dicaCard"
            type="text"
            placeholder="Ex: Hook de ciclo de vida"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={dicaCard}
            onChange={handleDicaChange}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
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
