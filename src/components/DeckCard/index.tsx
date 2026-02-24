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
        className="flex mx-36 gap-8 mt-8 hover:bg-primary-flashcard/20 transition rounded-lg p-4 cursor-pointer"
        onClick={() => navigate(`/materia/${materiaId}/deck/${id}`)}
      >
        <div className="flex justify-between items-center w-full gap-4">
          <div className="containerProgressbar flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h5 className="text-primary-flashcard font-black text-2xl">
                {nomeDeck}
              </h5>
              <p>
                <span>{cardsConcluidos}</span> de <span>{totalCards}</span>{" "}
                cards concluídos
              </p>
            </div>
            <div className="barProgressCardHome w-full">
              <Progress className="w-[1000px]" value={progresso} />
            </div>
          </div>

          <button
            className="items-end hover:opacity-70 transition cursor-pointer"
            aria-label="Edit"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation(); // 👈 impede navegar ao clicar na caneta
              modal.open();
            }}
          >
            <PenIcon />
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
