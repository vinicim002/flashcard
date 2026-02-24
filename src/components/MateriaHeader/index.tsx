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
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-6 py-6 lg:px-36">
        {/* Lado Esquerdo: Logo + Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <LogoDaMateria
            icon={<TreesIcon size={48} className="md:w-16 md:h-16" />}
            className="p-3 shrink-0 rounded-2xl shadow-sm"
            style={{ backgroundColor: materiaAtual.cor }}
          />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h3 className="text-3xl md:text-5xl font-black text-primary-flashcard break-words">
                {materiaAtual.nome}
              </h3>
              <button
                className="configIconOrName p-2 cursor-pointer hover:bg-black/5 rounded-full transition"
                onClick={() => modal.open()}
              >
                <PenIcon size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-2">
              <p className="text-sm md:text-base text-black-flashcard">
                <span className="text-primary-flashcard font-bold">
                  {stats.masterizados}
                </span>{" "}
                de{" "}
                <span className="text-primary-flashcard font-bold">
                  {stats.total}
                </span>{" "}
                cards masterizados
              </p>
              <Progress
                value={stats.pct}
                className="w-full max-w-[256px] h-2.5"
              />
            </div>
          </div>
        </div>

        {/* Lado Direito: Porcentagem Gigante */}
        <div className="flex flex-col items-center justify-center">
          <div className="progressTotal text-5xl md:text-6xl font-black text-primary-flashcard leading-none">
            {stats.pct}%
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 md:hidden">
            Concluído
          </span>
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
