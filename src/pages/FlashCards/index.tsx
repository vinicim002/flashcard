import { Estatisticas } from "@/components/Estatisticas";
import { FlashCardHeader } from "@/components/FlashCardHeader";
import { FlashCardMain } from "@/components/FlashCardMain";
import { Modal } from "@/components/Modal";
import { AddCardForm } from "@/components/Modal/AddCardForm";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useModal } from "@/hooks/use-modal";
import type { CardModel } from "@/models/CardModel";
import { useParams } from "react-router";

export function FlashCard() {
  const modal = useModal<"card">();
  const { handleAddCard } = useMateriasContext();

  const params = useParams();

  if (!params.deckId) return null;

  const deckId: string = params.deckId;

  function handleSubmitCard(newCard: CardModel) {
    handleAddCard(deckId, newCard);
  }

  return (
    <div className="app w-screen h-screen flex flex-col px-36">
      <FlashCardHeader onAddCard={() => modal.open("card")} />

      <section className="mainContainer flex flex-1 justify-center items-center gap-3">
        <FlashCardMain />
        <Estatisticas />
      </section>

      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        {modal.data === "card" && (
          <AddCardForm onSubmitCard={handleSubmitCard} onClose={modal.close} />
        )}
      </Modal>
    </div>
  );
}
