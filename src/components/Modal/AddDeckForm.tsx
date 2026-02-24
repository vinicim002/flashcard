import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { DeckModel } from "@/models/DeckModel";

type AddDeckFormProps = {
  onSubmitDeck: (deck: DeckModel) => void;
  onClose: () => void;
};

export function AddDeckForm({ onSubmitDeck, onClose }: AddDeckFormProps) {
  const [nomeDeck, setDeck] = useState("");

  function handleSubmitDeck(e: React.FormEvent) {
    e.preventDefault();
    const newDeck = {
      id: uuidv4(),
      nome: nomeDeck,
      cards: [],
    };
    onSubmitDeck(newDeck);
    setDeck("");
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Adicionar Deck</h2>
        <p className="text-sm text-gray-500">Crie um novo deck para organizar seus cards</p>
      </div>

      {/* Preview */}
      <div className="w-full h-16 rounded-xl mb-4 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
        <span className="text-gray-500 font-bold text-lg">
          {nomeDeck || "Preview"}
        </span>
      </div>

      <form className="space-y-4" onSubmit={handleSubmitDeck}>
        <div className="flex flex-col gap-1">
          <label htmlFor="nomeDeck" className="text-sm font-medium text-gray-700">
            Nome do deck
          </label>
          <input
            id="nomeDeck"
            type="text"
            placeholder="Ex: Hooks"
            value={nomeDeck}
            onChange={(e) => setDeck(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}