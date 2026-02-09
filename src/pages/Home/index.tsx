import { MateriaHeader } from "@/components/MateriaHeader";
import { DeckList } from "@/components/DeckList";
import { DeckListHeader } from "@/components/DeckListHeader";
import { MainLayout } from "@/Layout/MainLayout";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/use-modal";
import { AddMateriaForm } from "@/components/Modal/AddMateriaForm";
import { useEffect, useState } from "react";
import type { MateriaModel } from "@/models/MateriaModel";

export function Home() {
  const modal = useModal();

  const [materias, setMaterias] = useState<MateriaModel[]>(() => {
    const materiasSalvas = localStorage.getItem("materias");
    return materiasSalvas ? JSON.parse(materiasSalvas) : [];
  });

  function handleAddMateria(newMateria: MateriaModel) {
    setMaterias((prevNewMateria) => [...prevNewMateria, newMateria]);
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
    <MainLayout onAddMateria={modal.open}>
      <div className="mainContent">
        <MateriaHeader nome={"REACT"} cardsEstudados={1} totalCards={1000} />
        <DeckListHeader />
        <DeckList decks={decks} />
        <Modal isOpen={modal.isOpen} onClose={modal.close}>
          <AddMateriaForm onSubmit={handleAddMateria}></AddMateriaForm>
        </Modal>
      </div>
    </MainLayout>
  );
}
