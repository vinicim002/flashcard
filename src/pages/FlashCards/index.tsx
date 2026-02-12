import { Estatisticas } from "@/components/Estatisticas";
import { FlashCardHeader } from "@/components/FlashCardHeader";
import { FlashCardMain } from "@/components/FlashCardMain";
import { Modal } from "@/components/Modal";
import { AddCardForm } from "@/components/Modal/AddCardForm";
// import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useModal } from "@/hooks/use-modal";

export function FlashCard() {
  const modal = useModal<"materia">();
  // const {} = useMateriasContext();

  return (
    <div className="app w-screen h-screen flex flex-col px-36">
      <FlashCardHeader onAddCard={() => modal.open("materia")} />

      <section className="mainContainer flex flex-1 justify-center items-center gap-3">
        <FlashCardMain />

        <Estatisticas />
      </section>

      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        {modal.data === "materia" && <AddCardForm />}
      </Modal>
    </div>
  );
}
