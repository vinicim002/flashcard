import { MateriaHeader } from "@/components/MateriaHeader";
import { DeckList } from "@/components/DeckList";
import { DeckListHeader } from "@/components/DeckListHeader";
import { MainLayout } from "@/Layout/MainLayout";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/use-modal";
import { AddMateriaForm } from "@/components/Modal/AddMateriaForm";

export function Home() {
  const modal = useModal();

  const decks = [
    {
      id: "1",
      nome: "Hooks",
      totalCards: 32,
      cardsConcluidos: 32,
    },
    {
      id: "2",
      nome: "Context API",
      totalCards: 20,
      cardsConcluidos: 5,
    },
  ];

  return (
    <MainLayout onAddMateria={modal.open}>
      <div className="mainContent">
        <MateriaHeader nome={"REACT"} cardsEstudados={1} totalCards={1000} />
        <DeckListHeader />
        <DeckList decks={decks} />
        <Modal isOpen={modal.isOpen} onClose={modal.close}>
          <AddMateriaForm></AddMateriaForm>
        </Modal>
      </div>
    </MainLayout>
  );
}
