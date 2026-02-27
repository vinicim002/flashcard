import type { MateriaModel } from "@/models/MateriaModel";
import { createElement, useState } from "react";
import { Trash2, Save } from "lucide-react";
import { IconePicker } from "@/components/IconePicker";
import { getIcone } from "@/utils/icones";
import { showMessage } from "@/adapters/showMessage";

type EditMateriaFormProps = {
  materia: MateriaModel;
  onEdit: (dadosAtualizados: Partial<MateriaModel>) => void;
  onDelete: () => void;
  onClose: () => void;
};

function PreviewIcone({
  nome,
  size,
  className,
}: {
  nome: string;
  size: number;
  className?: string;
}) {
  return createElement(getIcone(nome), { size, className });
}

export function EditMateriaForm({
  materia,
  onEdit,
  onDelete,
  onClose,
}: EditMateriaFormProps) {
  const [nome, setNome] = useState(materia.nome);
  const [cor, setCor] = useState(materia.cor);
  const [icone, setIcone] = useState(materia.icone ?? "BookOpen");
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || nome.trim().length < 3) {
      showMessage.error("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    onEdit({ nome, cor, icone });
    onClose();
    showMessage.success("Matéria atualizada!");
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto max-h-[82vh]">
      {/* CSS GLOBAL para esconder scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Editar Matéria</h2>
          <p className="text-sm text-gray-500">
            Ajuste o visual da sua categoria
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!confirmDelete) return setConfirmDelete(true);
            onDelete();
            onClose();
            showMessage.success("Matéria excluída!");
          }}
          className={`flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            confirmDelete
              ? "bg-red-600 text-white animate-pulse"
              : "text-red-500 bg-red-50 hover:bg-red-100"
          }`}
        >
          <Trash2 size={16} />
          {confirmDelete ? "Confirmar?" : "Excluir"}
        </button>
      </div>

      {/* Preview */}
      <div
        className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center gap-3 shadow-inner"
        style={{ backgroundColor: cor }}
      >
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <PreviewIcone
            nome={icone}
            size={32}
            className="text-white drop-shadow-md"
          />
        </div>
        <span className="text-white font-bold text-xl drop-shadow-md truncate max-w-[70%]">
          {nome || "Sem nome"}
        </span>
      </div>

      {/* Form com Scroll Invisível */}
      <form
        className="space-y-6 overflow-y-auto no-scrollbar pr-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Cor</label>
            <span className="text-xs text-gray-400 font-mono">
              {cor.toUpperCase()}
            </span>
          </div>
          <input
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="h-12 w-16 cursor-pointer rounded-lg border-2 border-white shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Ícone
          </label>
          <div className="rounded-2xl border border-gray-200 p-2 bg-white shadow-sm">
            <IconePicker value={icone} cor={cor} onChange={setIcone} />
          </div>
        </div>

        {/* Footer dentro do scroll */}
        <div className="mt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-gray-400 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
