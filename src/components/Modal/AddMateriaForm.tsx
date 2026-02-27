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
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">
          Nova Matéria
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          Configure o visual da disciplina
        </p>
      </div>

      {/* Preview */}
      <div
        className="w-full h-24 rounded-3xl mb-8 flex items-center justify-center gap-4 shadow-inner shrink-0"
        style={{ backgroundColor: corMateria }}
      >
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
          <PreviewIcone
            nome={icone}
            size={36}
            className="text-white drop-shadow-md"
          />
        </div>
        <span className="text-white font-bold text-xl drop-shadow-md truncate max-w-[60%]">
          {nomeMateria.trim() || "Nova Matéria"}
        </span>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Nome com fix de zoom do iOS */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            Nome da matéria
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Anatomia Humana"
            value={nomeMateria}
            onChange={(e) => setNomeMateria(e.target.value)}
            // text-[16px] impede o zoom forçado do navegador mobile
            className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-4 text-[16px] md:text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Seletor de Cor */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-3xl border-2 border-gray-100">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Cor
            </label>
            <span className="text-sm font-bold text-gray-700 font-mono uppercase">
              {corMateria}
            </span>
          </div>
          <input
            type="color"
            value={corMateria}
            onChange={(e) => setCorMateria(e.target.value)}
            className="h-14 w-14 cursor-pointer rounded-full border-4 border-white shadow-lg overflow-hidden transition-transform active:scale-90"
          />
        </div>

        {/* Picker de Ícones */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            Escolha um ícone
          </label>
          <div className="rounded-3xl border-2 border-gray-100 p-4 bg-white shadow-sm overflow-hidden">
            {/* Importante: O IconePicker deve ser apenas um container de botões */}
            <IconePicker value={icone} cor={corMateria} onChange={setIcone} />
          </div>
        </div>

        {/* Botões empilhados no mobile para facilitar o toque */}
        <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} /> CRIAR MATÉRIA
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 text-sm font-bold text-gray-400 hover:text-gray-600 active:bg-gray-50 rounded-2xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
