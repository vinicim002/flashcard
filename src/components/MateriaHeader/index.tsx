import { PenIcon, TreesIcon } from "lucide-react";
import { LogoDaMateria } from "../LogoDaMateria";
import type { MateriaModel } from "@/models/MateriaModel";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";
import { useModal } from "@/hooks/use-modal";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useNavigate } from "react-router";
import { Modal } from "../Modal";
import { EditMateriaForm } from "../Modal/EditMateriaForm";

type MateriaHeaderProps = {
  materiaAtual: MateriaModel;
};

export function MateriaHeader({ materiaAtual }: MateriaHeaderProps) {
  const { handleEditMateria, handleDeleteMateria } = useMateriasContext();
  const modal = useModal();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const cards = materiaAtual.decks.flatMap((d) => d.cards);
    const total = cards.length;
    const masterizados = cards.filter((c) => c.masterizado).length;
    const pct = total === 0 ? 0 : Math.round((masterizados / total) * 100);
    return { total, masterizados, pct };
  }, [materiaAtual]);

  function handleEdit(dadosAtualizados: Partial<MateriaModel>) {
    handleEditMateria(materiaAtual.id, dadosAtualizados);
  }

  function handleDelete() {
    handleDeleteMateria(materiaAtual.id);
    navigate("/");
  }

  return (
    <>
      <div className="flex justify-between items-center mx-36 my-6">
        <div className="flex items-center gap-4">
          <LogoDaMateria
            icon={<TreesIcon size={64} />}
            className="p-2"
            style={{ backgroundColor: materiaAtual.cor }}
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-5xl font-black text-primary-flashcard">
                {materiaAtual.nome}
              </h3>
              <button
                className="configIconOrName cursor-pointer hover:opacity-70 transition"
                onClick={() => modal.open()}
              >
                <PenIcon />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-black-flashcard">
                <span className="text-primary-flashcard font-semibold">
                  {stats.masterizados}
                </span>{" "}
                de{" "}
                <span className="text-primary-flashcard font-semibold">
                  {stats.total}
                </span>{" "}
                cards masterizados
              </p>
              <Progress value={stats.pct} className="w-64 h-2" />
            </div>
          </div>
        </div>

        <div className="progressTotal text-3xl font-black text-primary-flashcard">
          {stats.pct}%
        </div>
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <EditMateriaForm
          materia={materiaAtual}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={modal.close}
        />
      </Modal>
    </>
  );
}
// 👆 Arquivo termina aqui — sem o Modal duplicado embaixo
