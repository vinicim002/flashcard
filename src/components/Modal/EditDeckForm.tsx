import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";
import { useState } from "react";
import {
  Trash2,
  PenIcon,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Save,
  Check,
} from "lucide-react";
import { showMessage } from "@/adapters/showMessage";

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
    if (nomeDeck.trim().length < 3)
      return showMessage.error("O nome deve ter pelo menos 3 caracteres.");
    onEditDeck({ nome: nomeDeck });
    showMessage.success("Nome do deck atualizado!");
  }

  function handleDeleteDeck() {
    if (!confirmDeleteDeck) {
      setConfirmDeleteDeck(true);
      return;
    }
    onDeleteDeck();
    onClose();
    showMessage.success("Deck removido.");
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

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gerenciar Deck</h2>
          <p className="text-sm text-gray-500">
            Configure o nome e organize seus cards
          </p>
        </div>
        <button
          type="button"
          onClick={handleDeleteDeck}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition shrink-0 ml-4 ${
            confirmDeleteDeck
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 size={14} />
          {confirmDeleteDeck ? "Confirmar exclusão" : "Excluir deck"}
        </button>
      </div>

      {/* Preview nome */}
      <div className="w-full h-16 rounded-xl mb-4 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
        <span className="text-gray-700 font-bold text-lg">
          {nomeDeck.trim() || "Preview"}
        </span>
      </div>

      {/* Form nome */}
      <form className="mb-6" onSubmit={handleSalvarDeck}>
        <div className="flex gap-2">
          <input
            type="text"
            value={nomeDeck}
            required
            placeholder="Nome do deck"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={(e) => setNomeDeck(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1 shrink-0"
          >
            <Save size={14} /> Salvar
          </button>
        </div>
      </form>

      {/* Lista de Cards */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
          Cards ({deck.cards.length})
        </p>

        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
          {deck.cards.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-400">Este deck está vazio.</p>
            </div>
          ) : (
            deck.cards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Cabeçalho do Card */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => handleExpandirCard(card.id, card)}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {card.frente}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {card.verso}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {card.masterizado && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        ✓ Master
                      </span>
                    )}
                    {cardExpandido === card.id ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Conteúdo Expandido */}
                {cardExpandido === card.id && (
                  <div className="px-4 pb-4 pt-3 border-t border-gray-100 bg-gray-50">
                    {cardEmEdicao === card.id ? (
                      <div className="flex flex-col gap-2">
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
                            onClick={() => {
                              onEditCard(card.id, { frente, verso, dica });
                              setCardEmEdicao(null);
                              showMessage.success("Card editado!");
                            }}
                            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                          >
                            <Check size={14} /> Confirmar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {/* Frente / Verso */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-400 mb-1">Frente</p>
                            <p className="text-sm font-medium text-gray-700">
                              {card.frente}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-400 mb-1">Verso</p>
                            <p className="text-sm text-gray-700">
                              {card.verso}
                            </p>
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

                        {/* Ações */}
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => {
                              onResetCard(card.id);
                              showMessage.success("Progresso resetado.");
                            }}
                            className="flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition"
                          >
                            <RotateCcw size={14} /> Resetar
                          </button>
                          <button
                            onClick={() => setCardEmEdicao(card.id)}
                            className="flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                          >
                            <PenIcon size={14} /> Editar
                          </button>
                          <button
                            onClick={() => {
                              onDeleteCard(card.id);
                              showMessage.success("Card removido.");
                            }}
                            className="flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition"
                          >
                            <Trash2 size={14} /> Excluir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
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
    </div>
  );
}
