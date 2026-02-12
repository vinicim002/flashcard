import { MateriaHeader } from "@/components/MateriaHeader";
import { DeckList } from "@/components/DeckList";
import { DeckListHeader } from "@/components/DeckListHeader";
import { MainLayout } from "@/Layout/MainLayout";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/use-modal";
import { AddMateriaForm } from "@/components/Modal/AddMateriaForm";
import type { MateriaModel } from "@/models/MateriaModel";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useParams } from "react-router";
import { AddDeckForm } from "@/components/Modal/AddDeckForm";
import type { DeckModel } from "@/models/DeckModel";

export function Home() {
  const { materias, handleAddMateria, handleAddDeck } = useMateriasContext();
  const modal = useModal<"materia" | "deck">();

  const { id } = useParams();

  const materiaAtual = materias.find((materia) => materia.id === id);

  function handleSubmitMateria(newMateria: MateriaModel) {
    handleAddMateria(newMateria);
    modal.close();
  }

  function handleSubmitDeck(newDeck: DeckModel) {
    if (!id) return;

    handleAddDeck(id, newDeck);
    modal.close();
  }

  return (
    <MainLayout onAddMateria={() => modal.open("materia")}>
      <div className="mainContent">
        {!materiaAtual ? (
          <div>Selecione uma materia</div>
        ) : (
          <>
            <MateriaHeader materiaAtual={materiaAtual} />
            <DeckListHeader onAddDeck={() => modal.open("deck")} />
            <DeckList decks={materiaAtual.decks} materiaId={materiaAtual.id} />
          </>
        )}
        <Modal isOpen={modal.isOpen} onClose={modal.close}>
          {modal.data === "materia" && (
            <AddMateriaForm onSubmit={handleSubmitMateria} />
          )}
          {modal.data === "deck" && (
            <AddDeckForm onSubmitDeck={handleSubmitDeck} />
          )}
        </Modal>
      </div>
    </MainLayout>
  );
}
