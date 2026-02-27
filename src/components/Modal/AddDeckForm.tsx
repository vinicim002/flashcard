import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { DeckModel } from "@/models/DeckModel";
import { showMessage } from "@/adapters/showMessage";

type AddDeckFormProps = {
  onSubmitDeck: (deck: DeckModel) => void;
  onClose: () => void;
};

export function AddDeckForm({ onSubmitDeck, onClose }: AddDeckFormProps) {
  const [nomeDeck, setDeck] = useState("");

  function handleSubmitDeck(e: React.FormEvent) {
    e.preventDefault();

    if (!nomeDeck.trim()) {
      showMessage.error("O nome do deck é obrigatório.");
      return;
    }

    if (nomeDeck.trim().length < 3) {
      showMessage.error("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    const newDeck: DeckModel = {
      id: uuidv4(),
      nome: nomeDeck,
      cards: [],
    };

    onSubmitDeck(newDeck);
    setDeck("");
    onClose(); // Fechar após sucesso

    showMessage.success("Deck criado com sucesso!");
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Novo Deck</h2>
        <p className="text-sm text-gray-500">
          Crie uma coleção para organizar seus flashcards
        </p>
      </div>

      {/* Preview do Deck */}
      <div className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 px-4">
        <span className="text-gray-600 font-bold text-lg text-center truncate w-full">
          {nomeDeck || "Nome do Deck"}
        </span>
      </div>

      <form className="space-y-5" onSubmit={handleSubmitDeck}>
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor="nomeDeck" 
            className="text-sm font-semibold text-gray-700 ml-1"
          >
            Nome do deck
          </label>
          <input
            id="nomeDeck"
            type="text"
            minLength={3}
            maxLength={50}
            required
            placeholder="Ex: React Hooks, Inglês..."
            value={nomeDeck}
            onChange={(e) => setDeck(e.target.value)}
            // text-base no mobile evita o zoom automático do navegador
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Botões Responsivos */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/25 transition-all"
          >
            Criar Deck
          </button>
        </div>
      </form>
    </div>
  );
}