import { MateriaHeader } from "@/components/MateriaHeader";
import { DeckList } from "@/components/DeckList";
import { DeckListHeader } from "@/components/DeckListHeader";
import { MainLayout } from "@/Layout/MainLayout";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/use-modal";
import { AddMateriaForm } from "@/components/Modal/AddMateriaForm";
import { useEffect } from "react";
import { useMaterias } from "@/hooks/use-Materias";
import type { MateriaModel } from "@/models/MateriaModel";

export function Home() {
  const modal = useModal();
  const { materias, handleAddMateria } = useMaterias();

  function handleSubmitMateria(newMateria: MateriaModel) {
    handleAddMateria(newMateria);
    modal.close();
  }

  useEffect(() => {
    localStorage.setItem("materias", JSON.stringify(materias));
  }, [materias]);

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
    <MainLayout onAddMateria={modal.open} materias={materias}>
      <div className="mainContent">
        <MateriaHeader nome={"REACT"} cardsEstudados={1} totalCards={1000} />
        <DeckListHeader />
        <DeckList decks={decks} />
        <Modal isOpen={modal.isOpen} onClose={modal.close}>
          <AddMateriaForm onSubmit={handleSubmitMateria}></AddMateriaForm>
        </Modal>
      </div>
    </MainLayout>
  );
}
