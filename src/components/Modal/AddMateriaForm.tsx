import { showMessage } from "@/adapters/showMessage";
import type { MateriaModel } from "@/models/MateriaModel";
import { createElement, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconePicker } from "@/components/IconePicker";
import { getIcone } from "@/utils/icones";
import { Save } from "lucide-react";

type AddMateriaFormProps = {
  onSubmit: (materia: MateriaModel) => void;
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

export function AddMateriaForm({ onSubmit, onClose }: AddMateriaFormProps) {
  const [nomeMateria, setNomeMateria] = useState("");
  const [corMateria, setCorMateria] = useState("#5aa9e6");
  const [icone, setIcone] = useState("BookOpen");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!nomeMateria.trim() || nomeMateria.trim().length < 3) {
      showMessage.error("A matéria deve ter pelo menos 3 caracteres.");
      return;
    }

    onSubmit({
      id: uuidv4(),
      nome: nomeMateria,
      decks: [],
      totalDecksConcluidos: 0,
      cor: corMateria,
      icone,
    });

    onClose();
    showMessage.success("Matéria criada!");
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Nova Matéria
        </h2>
        <p className="text-sm text-gray-500">Personalize com ícone e cor</p>
      </div>

      {/* Preview */}
      <div
        className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center gap-3 shadow-inner shrink-0"
        style={{ backgroundColor: corMateria }}
      >
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <PreviewIcone
            nome={icone}
            size={32}
            className="text-white drop-shadow-md"
          />
        </div>
        <span className="text-white font-bold text-xl drop-shadow-md truncate max-w-[70%]">
          {nomeMateria.trim() || "Nova Matéria"}
        </span>
      </div>

      {/* Inputs - Sem travas de scroll interno que conflitam com o modal */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Nome da matéria
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Programação React"
            value={nomeMateria}
            onChange={(e) => setNomeMateria(e.target.value)}
            // text-base impede o zoom automático do iOS ao focar
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Cor</label>
            <span className="text-xs text-gray-400 font-mono">
              {corMateria.toUpperCase()}
            </span>
          </div>
          <input
            type="color"
            value={corMateria}
            onChange={(e) => setCorMateria(e.target.value)}
            className="h-12 w-16 cursor-pointer rounded-lg border-2 border-white shadow-sm transition-transform active:scale-90"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Ícone
          </label>
          <div className="rounded-2xl border border-gray-200 p-2 bg-white shadow-sm overflow-hidden">
            <IconePicker value={icone} cor={corMateria} onChange={setIcone} />
          </div>
        </div>

        {/* Botões - Fora de um footer fixo para que o teclado não os cubra */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-gray-400 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Criar Matéria
          </button>
        </div>
      </form>
    </div>
  );
}
