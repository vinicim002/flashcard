import { showMessage } from "@/adapters/showMessage";
import type { CardModel } from "@/models/CardModel";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Save } from "lucide-react"; // Importando ícones para melhorar a UX

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

    if (!frenteCard.trim() || frenteCard.trim().length < 3) {
      return showMessage.error("A pergunta deve ter no mínimo 3 caracteres.");
    }

    if (!versoCard.trim() || versoCard.trim().length < 3) {
      return showMessage.error("A resposta deve ter no mínimo 3 caracteres.");
    }

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

    showMessage.success("Card criado com sucesso!");
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-full max-h-[82vh]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Novo Card
        </h2>
        <p className="text-sm text-gray-500">
          Crie um novo flashcard para este deck
        </p>
      </div>

      {/* Preview */}
      <div className="w-full min-h-[90px] rounded-2xl mb-6 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 px-4 py-3 flex-shrink-0 transition-all">
        <span className="text-gray-700 font-bold text-sm text-center break-words w-full">
          {frenteCard || "Frente do card"}
        </span>
        {versoCard && (
          <span className="text-gray-400 text-xs text-center break-words w-full mt-2 pt-2 border-t border-gray-200/60">
            {versoCard}
          </span>
        )}
      </div>

      {/* 👇 Form envolve inputs E botões */}
      <form
        className="flex flex-col flex-1 overflow-hidden"
        onSubmit={handleSubmitCard}
      >
        <div className="space-y-5 flex-1 overflow-y-auto no-scrollbar px-1 pb-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="frenteCard"
              className="text-sm font-bold text-gray-700 ml-1"
            >
              Frente (Pergunta)
            </label>
            <textarea
              id="frenteCard"
              placeholder="Ex: O que é useEffect?"
              rows={3}
              className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              value={frenteCard}
              required
              onChange={(e) => setFrenteCard(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="versoCard"
              className="text-sm font-bold text-gray-700 ml-1"
            >
              Verso (Resposta)
            </label>
            <textarea
              id="versoCard"
              placeholder="Hook usado para efeitos colaterais..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              value={versoCard}
              required
              onChange={(e) => setVersoCard(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dicaCard"
              className="text-sm font-bold text-gray-700 ml-1"
            >
              Dica (Opcional)
            </label>
            <input
              id="dicaCard"
              type="text"
              placeholder="Ex: Hook de ciclo de vida"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              value={dicaCard}
              onChange={(e) => setDicaCard(e.target.value)}
            />
          </div>
        </div>

        {/* 👇 Botões dentro do form */}
        <div className="mt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 flex-shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl px-6 py-3.5 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Salvar Card
          </button>
        </div>
      </form>
    </div>
  );
}
