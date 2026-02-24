import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";
import { useState } from "react";
import {
  Trash2,
  PenIcon,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type EditDeckFormProps = {
  deck: DeckModel;
  onEditDeck: (dadosAtualizados: Partial<DeckModel>) => void;
  onDeleteDeck: () => void;
  onEditCard: (cardId: string, dadosAtualizados: Partial<CardModel>) => void;
  onDeleteCard: (cardId: string) => void;
  onResetCard: (cardId: string) => void;
  onClose: () => void;
};

export function EditDeckForm({
  deck,
  onEditDeck,
  onDeleteDeck,
  onEditCard,
  onDeleteCard,
  onResetCard,
  onClose,
}: EditDeckFormProps) {
  const [nomeDeck, setNomeDeck] = useState(deck.nome);
  const [confirmDeleteDeck, setConfirmDeleteDeck] = useState(false);
  const [cardExpandido, setCardExpandido] = useState<string | null>(null);
  const [cardEmEdicao, setCardEmEdicao] = useState<string | null>(null);
  const [frente, setFrente] = useState("");
  const [verso, setVerso] = useState("");
  const [dica, setDica] = useState("");

  function handleSalvarDeck(e: React.FormEvent) {
    e.preventDefault();
    onEditDeck({ nome: nomeDeck });
  }

  function handleDeleteDeck() {
    if (!confirmDeleteDeck) {
      setConfirmDeleteDeck(true);
      return;
    }
    onDeleteDeck();
    onClose();
  }

  function handleExpandirCard(cardId: string, card: CardModel) {
    if (cardExpandido === cardId) {
      setCardExpandido(null);
      setCardEmEdicao(null);
      return;
    }
    setCardExpandido(cardId);
    setCardEmEdicao(null);
    setFrente(card.frente);
    setVerso(card.verso);
    setDica(card.dica);
  }

  function handleEditarCard(cardId: string) {
    setCardEmEdicao(cardId);
  }

  function handleSalvarCard(cardId: string) {
    onEditCard(cardId, { frente, verso, dica });
    setCardEmEdicao(null);
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Editar Deck</h2>
          <p className="text-sm text-gray-500">
            Edite o deck e gerencie seus cards
          </p>
        </div>
        <button
          type="button"
          onClick={handleDeleteDeck}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            confirmDeleteDeck
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 size={14} />
          {confirmDeleteDeck ? "Confirmar exclusão" : "Excluir deck"}
        </button>
      </div>

      {/* Preview */}
      <div className="w-full h-16 rounded-xl mb-4 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
        <span className="text-gray-700 font-bold text-lg">
          {nomeDeck || "Preview"}
        </span>
      </div>

      {/* Form nome do deck */}
      <form className="space-y-2 mb-6" onSubmit={handleSalvarDeck}>
        <div className="flex gap-2">
          <input
            type="text"
            value={nomeDeck}
            onChange={(e) => setNomeDeck(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Nome do deck"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>

      {/* Lista de cards */}
      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
          Cards ({deck.cards.length})
        </p>

        {deck.cards.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhum card neste deck
          </p>
        )}

        {deck.cards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Mini card — clicável para expandir */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleExpandirCard(card.id, card)}
            >
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {card.frente}
                </p>
                <p className="text-xs text-gray-400 truncate">{card.verso}</p>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                {/* Badge masterizado */}
                {card.masterizado && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    ✓ Master
                  </span>
                )}
                {cardExpandido === card.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </div>

            {/* Conteúdo expandido */}
            {cardExpandido === card.id && (
              <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                {cardEmEdicao === card.id ? (
                  /* Modo edição */
                  <div className="flex flex-col gap-2 pt-3">
                    <input
                      type="text"
                      value={frente}
                      onChange={(e) => setFrente(e.target.value)}
                      placeholder="Frente (pergunta)"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                      type="text"
                      value={verso}
                      onChange={(e) => setVerso(e.target.value)}
                      placeholder="Verso (resposta)"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                      type="text"
                      value={dica}
                      onChange={(e) => setDica(e.target.value)}
                      placeholder="Dica (opcional)"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setCardEmEdicao(null)}
                        className="text-sm text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSalvarCard(card.id)}
                        className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                      >
                        Salvar card
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Modo visualização */
                  <div className="pt-3 flex flex-col gap-2">
                    <div className="flex gap-2 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Frente</p>
                        <p className="text-sm font-medium">{card.frente}</p>
                      </div>
                      <div className="w-px bg-gray-200" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Verso</p>
                        <p className="text-sm">{card.verso}</p>
                      </div>
                    </div>
                    {card.dica && (
                      <p className="text-xs text-gray-400 italic">
                        💡 {card.dica}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      Acertos consecutivos:{" "}
                      <strong>{card.acertosConsecutivos}</strong>
                    </p>

                    {/* Ações do card */}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onResetCard(card.id)}
                        title="Resetar progresso"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:bg-gray-200 px-2 py-1.5 rounded-lg transition"
                      >
                        <RotateCcw size={12} /> Resetar
                      </button>
                      <button
                        onClick={() => handleEditarCard(card.id)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition"
                      >
                        <PenIcon size={12} /> Editar
                      </button>
                      <button
                        onClick={() => onDeleteCard(card.id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 px-2 py-1.5 rounded-lg transition"
                      >
                        <Trash2 size={12} /> Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Fechar
        </button>
      </div>
    </>
  );
}
