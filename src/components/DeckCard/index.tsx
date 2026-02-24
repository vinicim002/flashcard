import { PenIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "../Modal";
import { EditDeckForm } from "../Modal/EditDeckForm";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import type { DeckModel } from "@/models/DeckModel";

type DeckCardProps = {
  id: string;
  materiaId: string;
  nomeDeck: string;
  totalCards: number;
  cardsConcluidos: number;
  deck: DeckModel; // 👈 passa o deck completo
};

export function DeckCard({
  id,
  materiaId,
  nomeDeck,
  totalCards,
  cardsConcluidos,
  deck,
}: DeckCardProps) {
  const navigate = useNavigate();
  const modal = useModal();
  const { handleEditDeck, handleDeleteDeck, handleEditCard, handleDeleteCard } =
    useMateriasContext();

  const progresso =
    totalCards === 0 ? 0 : Math.round((cardsConcluidos / totalCards) * 100);

  function handleResetCard(cardId: string) {
    handleEditCard(id, cardId, {
      acertosConsecutivos: 0,
      proximaRevisao: Date.now(),
      masterizado: false,
    });
  }

  return (
    <>
      <li
        className="
    flex flex-col sm:flex-row gap-4 mt-4 
    mx-4 md:mx-8 lg:mx-36 
    bg-white-flashcard text-black-flashcard 
    p-6 cursor-pointer 
    rounded-2xl border-2 border-primary-flashcard 
    transition-all active:scale-[0.98] 
    hover:bg-primary-flashcard/10 
    group listaDeck
  "
        onClick={() => navigate(`/materia/${materiaId}/deck/${id}`)}
      >
        <div className="flex justify-between items-start w-full gap-4">
          <div className="flex flex-col gap-4 w-full">
            {/* Título e Contador */}
            <div className="flex flex-col gap-1">
              <h5 className="text-primary-flashcard font-black text-xl md:text-2xl leading-tight">
                {nomeDeck}
              </h5>
              <p className="text-sm md:text-base text-black-flashcard">
                <span className="font-bold">{cardsConcluidos}</span> de{" "}
                <span className="font-bold">{totalCards}</span> cards concluídos
              </p>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full pr-2">
              <Progress className="w-full h-3" value={progresso} />
            </div>
          </div>

          {/* Botão de Edição - Com hover isolado */}
          <button
            className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              modal.open();
            }}
          >
            <PenIcon size={20} className="text-primary-flashcard" />
          </button>
        </div>
      </li>

      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <EditDeckForm
          deck={deck}
          onEditDeck={(dados) => handleEditDeck(id, dados)}
          onDeleteDeck={() => {
            handleDeleteDeck(id);
            modal.close();
          }}
          onEditCard={(cardId, dados) => handleEditCard(id, cardId, dados)}
          onDeleteCard={(cardId) => handleDeleteCard(id, cardId)}
          onResetCard={handleResetCard}
          onClose={modal.close}
        />
      </Modal>
    </>
  );
}
